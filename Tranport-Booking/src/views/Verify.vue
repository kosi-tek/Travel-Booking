<template>
  <div>
    <!-- Your existing content -->
    
    <!-- Modal -->
    <div v-if="modalVisible" class="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-4 bg-gray-800 bg-opacity-80 overflow-y-auto">
      <div class="max-w-xl w-full mx-auto bg-gray-500 rounded-xl overflow-hidden">
        <div class="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 mb-5 bg-gray-600 rounded-full">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4733 4.80667C12.4114 4.74418 12.3376 4.69458 12.2564 4.66074C12.1751 4.62689 12.088 4.60947 12 4.60947C11.912 4.60947 11.8249 4.62689 11.7436 4.66074C11.6624 4.69458 11.5886 4.74418 11.5267 4.80667L6.56 9.78L4.47333 7.68667C4.40899 7.62451 4.33302 7.57563 4.24979 7.54283C4.16655 7.51003 4.07767 7.49394 3.98821 7.49549C3.89876 7.49703 3.81049 7.51619 3.72844 7.55185C3.64638 7.58751 3.57216 7.63898 3.51 7.70333C3.44784 7.76768 3.39896 7.84364 3.36616 7.92688C3.33336 8.01011 3.31727 8.099 3.31882 8.18845C3.32037 8.2779 3.33952 8.36618 3.37518 8.44823C3.41084 8.53028 3.46232 8.60451 3.52667 8.66667L6.08667 11.2267C6.14864 11.2892 6.22238 11.3387 6.30362 11.3726C6.38485 11.4064 6.47199 11.4239 6.56 11.4239C6.64801 11.4239 6.73514 11.4064 6.81638 11.3726C6.89762 11.3387 6.97136 11.2892 7.03333 11.2267L12.4733 5.78667C12.541 5.72424 12.595 5.64847 12.6319 5.56414C12.6689 5.4798 12.688 5.38873 12.688 5.29667C12.688 5.2046 12.6689 5.11353 12.6319 5.02919C12.595 4.94486 12.541 4.86909 12.4733 4.80667Z" fill="#2AD168"></path>
            </svg>
          </div>
<h4 class="text-xl text-gray-100 font-semibold mb-5">Trip Booked Successfully!</h4>
<p class="text-gray-300 font-medium">Your trip has been successfully booked. Get ready to embark on your journey!</p>

        </div>
        <div class="pt-5 pb-6 px-6 text-right bg-gray-600 -mb-2">
          <router-link to="/triphistory" class="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200 cursor-pointer">Confirm</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      trips: [],
      verificationInProgress: false, // State to track if verification is in progress
      modalVisible: false, // State to control modal visibility
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
      // Vehicle image logic
    },
    toggleReturnDate(trip) {
      // Toggle return date logic
    },
    formatReturnDate(trip) {
      // Format return date logic
    },
    async bookTrip(trip) {
      // Booking logic
    },
    async verifyBooking() {
      try {
        // Set verification in progress
        this.verificationInProgress = true;

        // Verification logic
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
          
          
          // Show modal after verification
          this.modalVisible = true;
        } else {
          console.error('Failed to verify payment and complete booking');
        }
      } catch (error) {
        console.error('Error verifying payment and booking trip:', error);
      } finally {
        // Reset verification in progress state
        this.verificationInProgress = false;
      }
    },
    fetchTrips() {
      // Fetch trips logic
    }
  },
  mounted() {
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
/* Your scoped styles */
</style>

