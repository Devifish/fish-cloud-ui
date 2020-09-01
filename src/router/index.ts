import { createRouter, createWebHistory } from "vue-router";
import error from "./error";
import auth from "./auth";
import user from "./user";
import role from "./role";
import menu from "./menu";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...auth,
    ...user,
    ...role,
    ...menu,
    ...error
  ]
});
