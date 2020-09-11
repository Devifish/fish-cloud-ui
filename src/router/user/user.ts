import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/list",
    name: "UserList",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/user/Index.vue"
      )
  },
  {
    path: "/user/add",
    name: "AddUser",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/user/AddUser.vue"
      )
  }
];

export default routes;
