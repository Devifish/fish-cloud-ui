import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/system",
    name: "SystemManagement",
    component: MainLayout,
    children: [
      {
        path: "/system/menu",
        name: "MenuManagement",
        component: () =>
          import(
            /* webpackChunkName: "system" */
            "@/views/system/menu/Index.vue"
          )
      },
      {
        path: "/system/dictionary",
        name: "DictionaryManagement",
        component: () =>
          import(
            /* webpackChunkName: "system" */
            "@/views/system/dictionary/Index.vue"
          )
      }
    ]
  }
];

export default routes;
