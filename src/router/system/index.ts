import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import menu from "./menu";
import dictionary from "./dictionary";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/system",
    name: "SystemManagement",
    component: MainLayout,
    children: [
      ...menu,
      ...dictionary
    ]
  }
];

export default routes;
