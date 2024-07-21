<template>
  <section>
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-3xl font-semibold">Select your bus type</h1>
      </div>
    </header>
    <div class="container mx-auto px-4 py-8">
      <!-- Trip list content -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="trip in trips"
          :key="trip.id"
          class="bg-white rounded-lg shadow-md"
        >
          <!-- Vehicle image -->
          <div class="p-4">
            <img
              :src="getVehicleImage(trip.vehicleType)"
              alt="Vehicle"
              class="w-full h-auto mb-4"
            />
          </div>

          <!-- Details -->
          <div class="px-4 pb-4">
            <h2 class="text-lg font-semibold">{{ trip.destination }}</h2>
            <p class="text-sm text-gray-500 mb-2">
              Departure: {{ trip.departure }}
            </p>
            <p class="text-sm text-gray-500 mb-2">
              Terminal: {{ trip.terminal }}
            </p>
            <p class="text-sm text-gray-500 mb-2">Date: {{ trip.date }}</p>
            <p class="text-sm text-gray-500 mb-2">
              Seats Left: {{ trip.seatsLeft }} / {{ trip.numberOfSeats }}
            </p>
            <!-- Vehicle type -->
            <p class="text-sm text-gray-500 mb-2">
              Vehicle Type: {{ trip.vehicleType }}
            </p>
            <!-- Trip price -->
            <p class="text-sm text-gray-500 mb-2">Price: ${{ trip.price }}</p>
            <!-- Checkbox for round trip -->
            <div class="flex items-center mb-2">
              <input
                type="checkbox"
                v-model="trip.roundTrip"
                @change="toggleReturnDate(trip)"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
              <label for="roundTrip" class="ml-2 text-sm text-gray-500"
                >To and Fro</label
              >
            </div>
            <!-- Return date -->
            <input
              type="date"
              v-if="trip.roundTrip && trip.showReturnDate"
              v-model="trip.returnDate"
              class="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <!-- Button -->
          <div class="px-4 pb-4">
            <button
              class="font-bold rounded-lg text-base w-full bg-[#374151] text-white py-2"
              @click="handlePayment(trip)"
            >
              Book Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    getVehicleImage(vehicleType) {
      return this.trips.find((trip) => trip.vehicleType === vehicleType)
        ?.vehicleImage;
    },
    toggleReturnDate(trip) {
      // Show return date input if roundTrip is checked
      trip.showReturnDate = trip.roundTrip;
    },
    toggleReturnDate(trip) {
      // Show return date input if roundTrip is checked
      trip.showReturnDate = trip.roundTrip;

      // Adjust price by two if roundTrip is checked
      if (trip.roundTrip) {
        trip.price *= 2;
      } else {
        trip.price /= 2;
      }
    },
  },
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
