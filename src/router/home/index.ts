import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: MainLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(
            /* webpackChunkName: "home" */
            "@/views/home/Index.vue"
          )
      }
    ]
  }
];

export default routes;
