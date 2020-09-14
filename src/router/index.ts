import { createRouter, createWebHistory } from "vue-router";
import error from "./error";
import auth from "./auth";
import home from "./home";
import user from "./user";
import system from "./system";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      redirect: "/home"
    },

    ...auth,
    ...home,
    ...user,
    ...system,
    ...error
  ]
});
