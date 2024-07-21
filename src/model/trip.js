const mongoose = require("mongoose");
const uuid = require("uuid");

const tripSchema = new mongoose.Schema({
  trip_id: {
    type: String,
    default: () => `Trip-${uuid.v4()}`,
    unique: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  terminal: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  seatsLeft: {
    type: Number,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ["Bus", "Luxurious Bus", "Travel"],
  },
  price: {
    type: Number,
    required: true,
  },
  // image: {
  //   type: String, 
  //   required: true,
  // },
  roundTrip: {
    type: Boolean,
    required: true,
  },
  showReturnDate: {
    type: Boolean,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = { Trip };
