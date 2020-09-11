import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/system/dictionary",
    name: "DictionaryManagement",
    component: () =>
      import(
        /* webpackChunkName: "system" */
        "@/views/system/dictionary/Index.vue"
      )
  }
];

export default routes;
