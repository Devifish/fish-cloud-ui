import { createRouter, createWebHistory } from "vue-router";
import error from "./error";
import auth from "./auth";
import user from "./user";
import setting from "./setting";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...auth,
    ...user,
    ...setting,
    ...error
  ]
});
