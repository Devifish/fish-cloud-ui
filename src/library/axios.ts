import Axios, { AxiosRequestConfig } from "axios";
import { App } from "vue";
import { notification, message } from "ant-design-vue";

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
          case 401:
          case 403:
            content = data.message;
            break;
          default:
            content = "未知错误";
            break;
        }
        message.error(content, undefined, callback);
      }
    }

    // 继续向上传递异常
    throw error;
  }
);

export default {
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
