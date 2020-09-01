import { RouteRecordRaw } from "vue-router";
import _404 from "../views/404.vue";

export default <Array<RouteRecordRaw>>[
  {
    path: "/404",
    name: "404",
    component: _404
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];
