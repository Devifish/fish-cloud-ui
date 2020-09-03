import { RouteRecordRaw } from "vue-router";
import BaseLayout from "@/layouts/BaseLayout.vue";
import _403 from "@/views/error/403.vue";
import _404 from "@/views/error/404.vue";
import _500 from "@/views/error/500.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/error",
    name: "Error",
    component: BaseLayout,
    children: [
      {
        path: "/error/403",
        name: "403",
        component: _403
      },
      {
        path: "/error/404",
        name: "404",
        component: _404
      },
      {
        path: "/error/500",
        name: "500",
        component: _500
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/error/404"
  }
];

export default routes;
