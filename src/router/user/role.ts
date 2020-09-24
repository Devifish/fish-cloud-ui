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
    name: "RoleAdd",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/role/Edit.vue"
      )
  },
  {
    path: "/user/role/edit/:id",
    name: "RoleEdit",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/role/Edit.vue"
      )
  }
];

export default routes;
