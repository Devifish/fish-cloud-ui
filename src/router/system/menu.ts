import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/system/menu",
    name: "MenuManagement",
    component: () =>
      import(
        /* webpackChunkName: "system" */
        "@/views/system/menu/Index.vue"
      )
  }
];

export default routes;
