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
  },
  {
    path: "/system/menu/add",
    name: "UserAdd",
    component: () =>
      import(
        /* webpackChunkName: "system" */
        "@/views/system/menu/Edit.vue"
      )
  },
  {
    path: "/system/menu/edit/:id",
    name: "UserEdit",
    component: () =>
      import(
        /* webpackChunkName: "system" */
        "@/views/system/menu/Edit.vue"
      )
  }
];

export default routes;
