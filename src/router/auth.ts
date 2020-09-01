import { RouteRecordRaw } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";

export default <Array<RouteRecordRaw>>[
  {
    path: "/auth",
    name: "AuthLayout",
    component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () =>
          import(
            /* webpackChunkName: "auth" */
            "@/views/auth/Login.vue"
          )
      }
    ]
  }
];
