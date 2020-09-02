import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/role/list",
    name: "RoleList",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/role/RoleList.vue"
      )
  },
  {
    path: "/user/role/add",
    name: "RoleAdd",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/role/RoleAdd.vue"
      )
  }
];

export default routes;
