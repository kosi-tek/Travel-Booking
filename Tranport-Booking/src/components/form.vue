<!-- FormComponent.vue -->
<template>
  <div>
    <h1>Search for Trips</h1>
    <form @submit.prevent="searchTrips">
      <div class="mb-1 sm:mb-2">
        <label for="departure" class="inline-block mb-1 font-medium"
          >Departure</label
        >
        <select
          id="departure"
          name="departure"
          class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-blue-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          v-model="departure"
        >
          <option value="abuja">Abuja</option>
          <option value="enugu">Enugu</option>
          <option value="imo">Imo</option>
          <option value="lagos">Lagos</option>
          <option value="abia">Abia</option>
        </select>
      </div>

      <div class="mb-1 sm:mb-2">
        <label for="destination" class="inline-block mb-1 font-medium"
          >Destination</label
        >
        <select
          id="destination"
          name="destination"
          class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-blue-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          v-model="destination"
        >
          <option value="abuja">Abuja</option>
          <option value="enugu">Enugu</option>
          <option value="imo">Imo</option>
          <option value="lagos">Lagos</option>
          <option value="abia">Abia</option>
        </select>
      </div>

      <div class="mb-1 sm:mb-2">
        <label for="time" class="inline-block mb-1 font-medium"
          >Departure Date</label
        >
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
</template>

<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default {
  data() {
    return {
      departure: "",
      destination: "",
      departureDate: "",
    };
  },
  methods: {
    searchTrips() {
      // Capture form input values
      const searchCriteria = {
        departure: this.departure,
        destination: this.destination,
        departureDate: this.departureDate,
      };

      // Navigate to /trips route with query parameters
      this.$router.push({ path: "/trips", query: searchCriteria });
    },
  },
  mounted() {
    flatpickr("#time", {
      dateFormat: "Y-m-d", // Date format (YYYY-MM-DD)
      minDate: "today", // Minimum selectable date is today
    });
  },
};
</script>
