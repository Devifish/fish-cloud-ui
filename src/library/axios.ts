import Axios, { AxiosRequestConfig } from "axios";
import { App } from "vue";
import Store from "@/store";
import { message } from "ant-design-vue";

interface AxiosLibrary {
  install(app: App): void;
  authorization: (accessToken: string, tokenType: string) => void;
  get: (url: string, config?: AxiosRequestConfig) => Promise<any>;
  delete: (url: string, config?: AxiosRequestConfig) => Promise<any>;
  head: (url: string, config?: AxiosRequestConfig) => Promise<any>;
  options: (url: string, config?: AxiosRequestConfig) => Promise<any>;
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
  put: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
}

interface AxiosRequestMessage {
  show?: boolean;
  callback?: () => void;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    message?: AxiosRequestMessage;
  }
}

// 公共参数
const baseUrl = new URL(process.env.VUE_APP_API_BASE_URL);
const withCredentials = location.hostname != baseUrl.hostname;

// 公共Axios实例
const axios = Axios.create({
  baseURL: baseUrl.href,
  timeout: 10000,
  withCredentials
});

// Request 过滤器
axios.interceptors.request.use(request => {
  const { headers, params } = request;
  const { token } = Store.state.auth;

  // OAuth2用户Token注入
  if (token) {
    const { header, value } = token.tokenData();
    headers[header] = value;
  }

  // 过滤空参数
  if (params) {
    const keys = Object.keys(params);
    for (let key of keys) {
      const value = params[key];
      switch (value) {
        case undefined:
        case null:
        case "":
          delete params[key];
          break;
      }
    }
  }

  return request;
});

// Response 过滤器
axios.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  error => {
    if (error.response) {
      console.log(error?.response)
      const { config, data, status } = error.response;
      const show = config.message?.show ?? true;

      if (show) {
        const callback = config.message?.callback;

        // 处理各种状态下的消息
        let content: string;
        switch (status) {
          case 400:
          case 412:
            content = data.message;
            break;
          case 401:
            content = "登录已过期，请重新登录";
            break;
          case 403:
            content = "您没有权限，无法访问";
            break;
          case 404:
            content = "Not Found 404";
            break;
          case 500:
            content = "服务端异常";
            break;
          default:
            content = data.message;
            break;
        }
        message.error(content, undefined, callback);
      }
    } else if (error.message) {
      const msg = error.message;
      switch (msg) {
        case "Network Error":
          message.error("网络错误, 无法连接服务器");
          break;
        default:
          message.error(msg);
          break;
      }
    }

    // 继续向上传递异常
    throw error;
  }
);

export default <AxiosLibrary>{
  install(app: App) {
    app.config.globalProperties.$http = axios;
  },

  // 暴露 Axios 方法
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  head: axios.head,
  options: axios.options,
  put: axios.put,
  patch: axios.patch
};
