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
    name: "UserAdd",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/user/Edit.vue"
      )
  },
  {
    path: "/user/edit/:id",
    name: "UserEdit",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/user/Edit.vue"
      )
  },
  {
    path: "/user/info/:id",
    name: "UserInfo",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/user/Info.vue"
      )
  }
];

export default routes;
