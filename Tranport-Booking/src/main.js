import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";

// Import components with .vue extension
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import About from "./views/About.vue";
import Contact from "./views/Contact.vue";
import TripList from "./views/TripList.vue";
import Verify from "./views/Verify.vue";
import TripHistory from "./views/TripHistory.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/trips",
    name: "TripList",
    component: TripList,
    props: (route) => ({ trips: route.params.trips }), // Enable route props
  },
  {
    path: "/triphistory",
    name: "TripHistory",
    component: TripHistory,
    props: (route) => ({ trips: route.params.trips }), // Enable route props
  },
  {
    path: "/verify",
    component: Verify,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
