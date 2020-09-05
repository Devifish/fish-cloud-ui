import Axios, { AxiosRequestConfig } from "axios";
import { App } from "vue";
import { message } from "ant-design-vue";

interface AxiosLibrary {
  install(app: App): void;
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

const axios = Axios.create({
  baseURL: "https://cloud.devifish.cn",
  timeout: 10000,
  withCredentials: true
});

axios.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  error => {
    const response = error.response;

    // 如果存在错误消息则处理
    if (response) {
      const { config, data, status } = response;
      const show = config.message?.show ?? true;

      if (show) {
        const callback = config.message?.callback;

        // 处理各种状态下的消息
        let content: string;
        switch (status) {
          case 400:
          case 401:
          case 403:
          case 412:
            content = data.message;
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
