import { RouteRecordRaw } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";

export default <Array<RouteRecordRaw>>[
  {
    path: "/auth",
    name: "AuthLayout",
    redirect: "/auth/login",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(
            /* webpackChunkName: "auth" */
            "@/views/auth/Login.vue"
          )
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(
            /* webpackChunkName: "auth" */
            "@/views/auth/Register.vue"
          )
      }
    ]
  }
];
