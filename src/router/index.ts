import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import Home from "../views/Home.vue";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    ...auth
  ]
});
