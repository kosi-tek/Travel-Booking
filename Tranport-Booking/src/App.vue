<template>
  <div id="app">
    <Navbar/>
    <router-view :trips="trips"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';

const trips = ref([]);

const fetchTrips = () => {
  setTimeout(() => {
    trips.value = [
    
    ];
  }, 1000); // Simulated delay
};

onMounted(() => {
  fetchTrips();
});
</script>

<style scoped></style>
