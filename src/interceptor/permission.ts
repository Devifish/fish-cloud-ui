import { RouterInterceptor } from "./index";

export const NO_LOGIN = "no-login";

/**
 * 权限拦截器
 * 拦截无权限用户操作
 *
 * @param to
 * @param from
 */
var interceptor: RouterInterceptor = (to, from) => {
  const { meta } = to;

  return true;
};

export default interceptor;
