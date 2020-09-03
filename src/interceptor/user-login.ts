import { RouterInterceptor } from "./index";
import { LOGIN_PAGE_NAME } from "@/router/auth";

// 白名单
const ignore: any[] = [LOGIN_PAGE_NAME, "Register"];

/**
 * 用户登录拦截器
 * 防止未登录用户进入系统
 *
 * @param to 出口
 * @param from 入口
 */
var interceptor: RouterInterceptor = (to, from) => {
  const { name } = to;

  // 放行白名单
  if (ignore.includes(name)) return true;

  // 未登录则跳转至登录页
  return { name: LOGIN_PAGE_NAME };
};

export default interceptor;
