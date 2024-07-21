<template>
  <section>
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-3xl font-semibold">Select your bus type</h1>
      </div>
    </header>
    <div class="container mx-auto px-4 py-8">
      <div v-if="filteredTrips.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="trip in filteredTrips" :key="trip.trip_id" class="bg-white rounded-lg shadow-md">
          <div class="p-4">
            <img :src="getVehicleImage(trip.vehicleType)" alt="Vehicle" class="w-full h-auto mb-4" />
          </div>
          <div class="px-4 pb-4">
            <h2 class="text-lg font-semibold">{{ trip.destination }}</h2>
            <p class="text-sm text-gray-500 mb-2">Departure: {{ trip.departure }}</p>
            <p class="text-sm text-gray-500 mb-2">Terminal: {{ trip.terminal }}</p>
            <p class="text-sm text-gray-500 mb-2">Date: {{ trip.date }}</p>
            <p class="text-sm text-gray-500 mb-2">Seats Left: {{ trip.seatsLeft }} / {{ trip.numberOfSeats }}</p>
            <p class="text-sm text-gray-500 mb-2">Vehicle Type: {{ trip.vehicleType }}</p>
            <p class="text-sm text-gray-500 mb-2">Price: ${{ trip.price }}</p>
            <div class="flex items-center mb-2">
              <input type="checkbox" v-model="trip.roundTrip" @change="toggleReturnDate(trip)" class="form-checkbox h-5 w-5 text-indigo-600" />
              <label for="roundTrip" class="ml-2 text-sm text-gray-500">To and Fro</label>
            </div>
            <input type="date" v-if="trip.roundTrip && trip.showReturnDate" v-model="trip.returnDate" @input="formatReturnDate(trip)" class="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
          <div class="px-4 pb-4">
            <button v-if="trip.seatsLeft > 0" class="font-bold rounded-lg text-base w-full bg-[#374151] text-white py-2" @click="bookTrip(trip)">Book Trip</button>
            <div v-else class="text-red-500 text-center">No seats available for this trip</div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No trips available</div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      trips: [],
      user: {
        user_id: null, // Initialize user_id as null
        email: '',
        token: ''
      }
    };
  },
  computed: {
    filteredTrips() {
      const { destination, departure } = this.$route.query;
      return this.trips.filter(trip => {
        return (!destination || trip.destination.toLowerCase() === destination.toLowerCase()) &&
               (!departure || trip.departure.toLowerCase() === departure.toLowerCase());
      });
    }
  },
  methods: {
    getVehicleImage(vehicleType) {
      const vehicleImages = {
        Bus: 'https://st2.depositphotos.com/1358992/43886/i/450/depositphotos_438868626-stock-photo-white-minibus-isolated-white-background.jpg',
        'Luxurious Bus': 'https://st2.depositphotos.com/1358992/43886/i/450/depositphotos_438868626-stock-photo-white-minibus-isolated-white-background.jpg',
        Travel: '/images/travel.jpg'
      };
      return vehicleImages[vehicleType] || '/images/default.jpg';
    },
    toggleReturnDate(trip) {
      trip.showReturnDate = trip.roundTrip;
      trip.price = trip.roundTrip ? trip.price * 2 : trip.price / 2;
      if (!trip.roundTrip) {
        trip.returnDate = null; // Reset return date if roundTrip is unchecked
      }
    },
    formatReturnDate(trip) {
      if (trip.returnDate) {
        const date = new Date(trip.returnDate);
        trip.returnDate = date.toISOString().split('T')[0]; // Format to yyyy-MM-dd
      }
    },
    async bookTrip(trip) {
      try {
        const user_id = localStorage.getItem('user_id'); // Fetch user_id from local storage
        if (trip.seatsLeft <= 0) {
          console.error('No seats available for this trip');
          return; // Exit early if no seats available
        }
        
        const response = await axios.post('http://localhost:9000/api/v1/booking/book-trip', {
          trip_id: trip.trip_id,
          user_id: user_id,
          isRoundTrip: trip.roundTrip,
          returnTrip: trip.roundTrip ? {
            destination: trip.destination,
            departure: trip.departure,
            time: trip.time,
            price: trip.price / 2, // Assuming round trip price is twice the single trip price
            returnDate: trip.returnDate
          } : null
        });

        if (response.data.success) {
          const { authorization_url, reference } = response.data.data.payment;
          window.location.href = authorization_url;

          // Save reference for later verification
          localStorage.setItem('paymentReference', reference);
          localStorage.setItem('trip_id', trip.trip_id);
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('isRoundTrip', trip.roundTrip);
          if (trip.roundTrip) {
            localStorage.setItem('returnTrip', JSON.stringify({
              destination: trip.destination,
              departure: trip.departure,
              time: trip.time,
              price: trip.price / 2,
              returnDate: trip.returnDate
            }));
          }
        } else {
          console.error('Failed to initiate booking');
        }
      } catch (error) {
        console.error('Error booking trip:', error);
      }
    },
    async verifyBooking() {
      try {
        const reference = localStorage.getItem('paymentReference');
        const trip_id = localStorage.getItem('trip_id');
        const user_id = localStorage.getItem('user_id');
        const isRoundTrip = JSON.parse(localStorage.getItem('isRoundTrip'));
        const returnTrip = isRoundTrip ? JSON.parse(localStorage.getItem('returnTrip')) : null;

        const response = await axios.post('http://localhost:9000/api/v1/booking/verify-booking', {
          reference: reference,
          trip_id: trip_id,
          user_id: user_id,
          isRoundTrip: isRoundTrip,
          returnTrip: returnTrip
        });

        if (response.data.success) {
          console.log('Payment verified and booking completed');
          // Clear local storage after successful verification
          localStorage.removeItem('paymentReference');
          localStorage.removeItem('trip_id');
          localStorage.removeItem('user_id');
          localStorage.removeItem('isRoundTrip');
          if (isRoundTrip) {
            localStorage.removeItem('returnTrip');
          }
        } else {
          console.error('Failed to verify payment and complete booking');
        }
      } catch (error) {
        console.error('Error verifying payment and booking trip:', error);
      }
    },
    async fetchTrips() {
      try {
        const response = await axios.get('http://localhost:9000/api/v1/booking/alltrip');
        if (response.data.success) {
          this.trips = response.data.data;
        } else {
          console.error('Failed to fetch trips');
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    }
  },
  mounted() {
    this.user.user_id = localStorage.getItem('user_id'); // Initialize user_id from local storage
    this.fetchTrips();
    // Check if returning from payment gateway
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');
    if (reference) {
      this.verifyBooking();
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap");

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Roboto Slab", sans-serif;
}
</style>



