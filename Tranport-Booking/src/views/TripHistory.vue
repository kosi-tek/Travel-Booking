<template>
  <div class="trip-list">
    <div v-for="trip in trips" :key="trip._id" class="trip-card">
      <div class="trip-details">
        <div class="destination text-green-600 font-bold"><span class=""> Destination</span>:{{ trip.destination }}</div>
        <div class="departure font-bold"><span class="font-bold">Departure</span> {{ trip.departure }}</div>
        <div class="time">{{ formatTime(trip.time) }}</div>
        <div class="price">₦{{ trip.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trips: [
        {
          _id: "66829231d52874518bcdbd43",
          destination: "Lagos",
          departure: "Abuja",
          time: "2024-07-01T09:00:00.000+00:00",
          price: 7500
        }
        // Add more trips as needed
      ]
    };
  },
  methods: {
    formatTime(time) {
      return new Date(time).toLocaleString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
    }
  }
};
</script>

<style scoped>
.trip-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.trip-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.trip-card:hover {
  transform: translateY(-5px);
}

.trip-details {
  padding: 16px;
}

.destination, .departure, .time, .price {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.time {
  color: #666;
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #008cba;
}
</style>
