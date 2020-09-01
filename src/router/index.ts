import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import error from "./error";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...auth,
    ...error
  ]
});
