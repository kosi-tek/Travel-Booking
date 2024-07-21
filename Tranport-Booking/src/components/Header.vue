<template>
  <div class="relative">
    <img
      src="https://i.pinimg.com/564x/16/3c/7f/163c7f530f0d241bc90af1f5e584ded1.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
      class="absolute inset-0 object-cover w-full h-full"
      alt=""
    />
    <div class="relative bg-blue-900 bg-opacity-40">
      <div
        class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      >
        <div class="flex flex-col items-center justify-between xl:flex-row">
          <div class="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
            <h2
              class="max-w-lg mb-6 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl sm:leading-none md:text-center"
            >
              Embark on Adventures with <br class="hidden md:block" />
              Brit Transit <span class="text-teal-accent-400">Travel</span>
            </h2>
            <p
              class="max-w-xl mb-4 text-base text-lg font-bold text-white md:text-lg"
            >
              Discover Brit Transit Travel: your gateway to unforgettable
              journeys. Explore our destinations, from sandy beaches to historic
              landmarks. Let us guide you to the world's wonders and create
              lasting memories.
            </p>
          </div>
          <div class="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div class="bg-white rounded shadow-2xl p-7 sm:p-10">
              <h3
                class="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl"
              >
                Book Your Trip
              </h3>
              <form @submit.prevent="searchTrips">
  <div class="mb-1 sm:mb-2">
    <label for="departure" class="inline-block mb-1 font-medium">Departure</label>
    <select
      id="departure"
      name="departure"
      class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-blue-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
      v-model="departure"
    >
      <!-- Options for departure -->
      <option value="abuja">Abuja</option>
      <option value="enugu">Enugu</option>
      <option value="imo">Imo</option>
      <option value="lagos">Lagos</option>
    </select>
  </div>

  <div class="mb-1 sm:mb-2">
    <label for="destination" class="inline-block mb-1 font-medium">Destination</label>
    <select
      id="destination"
      name="destination"
      class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-blue-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
      v-model="destination"
    >
      <!-- Options for destination -->
      <option value="abuja">Abuja</option>
      <option value="enugu">Enugu</option>
      <option value="imo">Imo</option>
      <option value="lagos">Lagos</option>
      <option value="abia">Abia</option>
    </select>
  </div>

  <!-- Departure Date input -->
  <div class="mb-1 sm:mb-2">
    <label for="time" class="inline-block mb-1 font-medium">Departure Date</label>
    <input
      placeholder="Departure Date"
      type="text"
      class="flatpickr flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-blue-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
      id="time"
      name="time"
      v-model="departureDate"
      data-input
    />
  </div>
  
  <!-- Submit button -->
  <div class="mt-4 mb-2 sm:mb-4 bg-black">
    <button
      type="submit"
      class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-blue-600 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
    >
      Search Trip
    </button>
  </div>
</form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default {
  data() {
    return {
      departure: '',
      destination: '',
      departureDate: ''
    };
  },
  methods: {
    searchTrips() {
      // Capture form input values
      const searchCriteria = {
        departure: this.departure,
        destination: this.destination,
        departureDate: this.departureDate
      };

      // Navigate to /trips route with query parameters
      this.$router.push({ path: '/trips', query: searchCriteria });
    }
  },
  mounted() {
    flatpickr("#time", {
      dateFormat: "Y-m-d", // Date format (YYYY-MM-DD)
      minDate: "today", // Minimum selectable date is today
    });
  }
};
</script>