import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/system/menu/list",
    name: "MenuList",
    component: () =>
      import(
        /* webpackChunkName: "system" */
        "@/views/system/menu/MenuList.vue"
      )
  }
];

export default routes;
