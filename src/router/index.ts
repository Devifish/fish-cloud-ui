import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import user from "./user";
import role from "./role";
import menu from "./menu";
import _404 from "../views/404.vue";

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...auth,
    ...user,
    ...role,
    ...menu,

    // 重定向404页面
    {
      path: "/404",
      name: "404",
      component: _404
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404"
    }
  ]
});
