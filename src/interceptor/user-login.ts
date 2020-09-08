import Store from "@/store";
import { RouterInterceptor } from "./index";
import { createPathMatcher } from "@/utils/path-matcher";
import { LOGIN_PAGE_NAME } from "@/router/auth";

// 白名单
const ignore = ["/auth/**", "/error/**"];

// 创建路径匹配器
const pathMatcher = createPathMatcher(ignore);

/**
 * 用户登录拦截器
 * 防止未登录用户进入系统
 *
 * @param to 出口
 * @param from 入口
 */
const interceptor: RouterInterceptor = ({ path }) => {
  const { token } = Store.state.auth;

  // 用户已登录则直接放行
  if (token) return true;

  // 放行白名单
  if (pathMatcher.match(path)) return true;

  // 未登录则跳转至登录页
  return { name: LOGIN_PAGE_NAME };
};

export default interceptor;
