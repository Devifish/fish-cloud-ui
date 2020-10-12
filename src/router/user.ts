import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "UserManagement",
    component: MainLayout,
    children: [
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
        path: "/user/role",
        name: "RoleManagement",
        component: () =>
          import(
            /* webpackChunkName: "user" */
            "@/views/user/role/Index.vue"
          )
      },
      {
        path: "/user/dept",
        name: "DeptManagement",
        component: () =>
          import(
            /* webpackChunkName: "user" */
            "@/views/user/dept/Index.vue"
          )
      }
    ]
  }
];

export default routes;
