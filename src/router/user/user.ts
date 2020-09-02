import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/list",
    name: "UserList",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/user/UserList.vue"
      )
  },
  {
    path: "/user/add",
    name: "UserAdd",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/user/UserAdd.vue"
      )
  }
];

export default routes;
