import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import user from "./user";
import role from "./role";
import dept from "./dept";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "UserManagement",
    component: MainLayout,
    children: [
      ...user,
      ...role,
      ...dept
    ]
  }
];

export default routes;
