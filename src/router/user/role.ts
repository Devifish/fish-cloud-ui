import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/role",
    name: "RoleManagement",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/role/Index.vue"
      )
  },
  {
    path: "/user/role/add",
    name: "AddRole",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/role/AddRole.vue"
      )
  }
];

export default routes;
