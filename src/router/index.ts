import { createRouter, createWebHistory } from "vue-router";
import error from "./error";
import auth from "./auth";
import user from "./user";
import system from "./system";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      redirect: "/user/list"
    },

    ...auth,
    ...user,
    ...system,
    ...error
  ]
});
