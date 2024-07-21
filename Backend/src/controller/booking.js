const { User } = require("../model/user");
const Booking = require("../model/bookings");
const { Trip } = require("../model/trip");
const axios = require("axios");
const asyncHandler = require("express-async-handler");

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

// Controller for creating a trip
const createTrip = asyncHandler(async (req, res, next) => {
  try {
    // Verify if user_id is provided in the request body
    if (!req.body.user_id) {
      throw new CustomError("User ID is required to create a trip", 400);
    }

    // Check if the user with the specified user_id exists
    const user = await User.findOne({ user_id: req.body.user_id });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // Create trip with user data
    const tripData = req.body;
    const trip = await Trip.create(tripData);

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: trip,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const allTrips = asyncHandler(async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.status(201).json({
      success: true,
      message: "Trips retrieved successfully",
      data: trips,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const findTrip = asyncHandler(async (req, res, next) => {
  try {
    const { date, departure, destination } = req.body; // Extracting departure date, departure, and destination from query parameters

    // Find the trips that match the departure date, departure, and destination
    const trips = await Trip.find({
      date: date, // Convert the departure date string to a Date object
      departure: departure,
      destination: destination,
    });

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Trips not available for the specified criteria.",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Trips retrieved successfully",
      data: trips,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const paystackConfig = {
  secretKey: process.env.PAYSTACK_SECRET_KEY, // Ensure you have your Paystack secret key in your environment variables
};

const paystackHeaders = {
  Authorization: `Bearer ${paystackConfig.secretKey}`,
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

const paystackPaymentURL = "https://api.paystack.co/transaction/initialize";
const paystackVerifyURL = "https://api.paystack.co/transaction/verify";

// Function to initiate Paystack payment
const initiatePaystackPayment = async (email, amount) => {
  const response = await axios.post(
    paystackPaymentURL,
    { email, amount },
    { headers: paystackHeaders }
  );
  return response.data;
};

// Function to verify Paystack payment
const verifyPaystackPayment = async (reference) => {
  const response = await axios.get(`${paystackVerifyURL}/${reference}`, {
    headers: paystackHeaders,
  });
  return response.data;
};


const bookTrip = asyncHandler(async (req, res, next) => {
  try {
    const { trip_id, user_id, isRoundTrip } = req.body;

    // Validate input
    if (!trip_id || !user_id || isRoundTrip === undefined) {
      throw new CustomError(
        "Trip ID, User ID, and isRoundTrip are required",
        400
      );
    }

    // Check if the trip exists
    const trip = await Trip.findOne({ trip_id });
    if (!trip) {
      throw new CustomError("Trip not found", 404);
    }

    // Check if the user exists
    const user = await User.findOne({ user_id });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // Check if there are enough seats available for the outbound trip
    if (trip.seatsLeft < 1) {
      throw new CustomError(
        "Not enough seats available for the outbound trip",
        400
      );
    }

    // Calculate total amount
    const amount = isRoundTrip ? trip.price * 2 : trip.price;

    // Initialize Paystack payment
    const paymentResponse = await initiatePaystackPayment(
      user.email,
      amount * 100
    ); // Paystack amounts are in kobo

    // // Create a booking with payment pending status
    // const booking = await Booking.create({
    //   trip_id,
    //   user_id,
    //   isRoundTrip,
    //   amount,
    //   payments: [
    //     {
    //       paymentReference: paymentResponse.data.reference,
    //       paymentStatus: "Pending",
    //       amount: amount, // Ensure amount is included
    //     },
    //   ],
    // });

    // Respond with payment details for the user to complete the payment
    res.status(201).json({
      success: true,
      message: "Trip booked successfully. Complete payment to confirm.",
      data: {
        payment: {
          reference: paymentResponse.data.reference,
          authorization_url: paymentResponse.data.authorization_url,
        },
      },
    });
  } catch (error) {
    console.error("Error booking trip:", error);
    next(error);
  }
});

const verifyAndCreateBooking = asyncHandler(async (req, res, next) => {
  try {
    const { reference, trip_id, user_id, isRoundTrip, returnTrip_id } =
      req.body;

    // Verify Paystack payment
    const paymentVerification = await verifyPaystackPayment(reference);

    if (paymentVerification.data.status !== "success") {
      throw new CustomError("Payment verification failed", 400);
    }

    // Find the trip using trip_id string
    const trip = await Trip.findOne({ trip_id });
    if (!trip) {
      throw new CustomError("Trip not found", 404);
    }
    if (trip.seatsLeft < 1) {
      throw new CustomError("No seats left", 400);
    }

    // Calculate the amount based on isRoundTrip
    let amount = trip.price;
    if (isRoundTrip) {
      amount *= 2;
    }

    // Reduce the number of seats left
    trip.seatsLeft -= 1;
    await trip.save();

    // Populate trip details including terminal
    const populatedBookingData = {
      destination: trip.destination,
      departure: trip.departure,
      terminal: trip.terminal, // Include terminal here
      time: trip.time, // Adjust according to your actual time field in the trip model
      price: trip.price,
    };

    // Create the booking with payment details and populated trip data
    const booking = await Booking.create({
      trip_id,
      user_id,
      isRoundTrip,
      ...populatedBookingData,
      payments: [
        {
          amount: amount,
          paymentReference: reference,
          paymentStatus: "Completed",
          paymentDate: new Date(),
        },
      ],
    });

    // Manually join the trip, returnTrip, and user data
    const populatedBooking = {
      ...booking._doc,
      trip: populatedBookingData,
      returnTrip: isRoundTrip
        ? await Trip.findOne(
            { trip_id: returnTrip_id },
            "destination departure terminal time price"
          )
        : null,
      user: await User.findOne({ user_id }, "fullName email"),
    };

    res.status(201).json({
      success: true,
      message: "Payment successful and trip booked.",
      data: populatedBooking,
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.paymentReference
    ) {
      return res.status(400).json({
        success: false,
        error:
          "A booking with this payment reference already exists. Please check your payment reference and try again.",
      });
    }
    console.error("Error verifying payment and booking trip:", error);
    next(error);
  }
});


const getBookedTrips = asyncHandler(async (req, res, next) => {
  try {
    const { user_id } = req.body;

    // Find all bookings for the user
    const bookings = await Booking.find({ user_id })
      .populate("trip_id")
      .populate("returnTrip_id");

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error getting booked trips:", error);
    next(error);
  }
});
module.exports = {
  createTrip,
  allTrips,
  findTrip,
  bookTrip,
  verifyAndCreateBooking,
  getBookedTrips
};
