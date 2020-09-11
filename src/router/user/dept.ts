import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/dept",
    name: "DeptManagement",
    component: () =>
      import(
        /* webpackChunkName: "user" */
        "@/views/user/dept/Index.vue"
      )
  }
];

export default routes;
