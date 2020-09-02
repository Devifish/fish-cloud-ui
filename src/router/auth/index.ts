import { RouteRecordRaw } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "Auth",
    redirect: "/auth/login",
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
      },
      {
        path: "/auth/register",
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

export default routes;
