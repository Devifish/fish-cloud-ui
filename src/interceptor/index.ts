import { Router, RouteLocationNormalized, RouteLocationRaw } from "vue-router";
import UserLoginInterceptor from "./user-login";
import PermissionInterceptor from "./permission";

export interface RouterInterceptor {
  (to: RouteLocationNormalized, from: RouteLocationNormalized):
    | boolean
    | RouteLocationRaw;
}

/**
 * 拦截器列表
 */
const interceptors: Array<RouterInterceptor> = [
  UserLoginInterceptor,
  PermissionInterceptor
];

export default {
  setup(router: Router) {
    router.beforeEach((to, from, next) => {
      if (interceptors.length === 0) next();

      // 轮询各个路由拦截器
      let pass = false;
      for (const interceptor of interceptors) {
        const collback = interceptor(to, from);

        if (collback === true) {
          pass = true;
        } else if (collback === false) {
          pass = false;
          next(false);
          break;
        } else {
          pass = false;
          next(collback);
          break;
        }
      }

      // 全部拦截器放行
      if (pass) next();
    });
  }
};
