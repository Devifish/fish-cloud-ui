import Axios, { AxiosRequestConfig, AxiosTransformer } from "axios";
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

class OAuth2Token {
  readonly TOKEN_HEADER = "Authorization";

  accessToken: string;
  tokenType: string;

  constructor(accessToken: string, tokenType: string) {
    this.accessToken = token.accessToken;
    this.tokenType = token.tokenType;
  }

  tokenData() {
    const tokenValue = `${this.tokenType} ${this.accessToken}`;
    return {
      header: this.TOKEN_HEADER,
      value: tokenValue
    };
  }
}

// 公共Axios实例
const axios = Axios.create({
  baseURL: "https://cloud.devifish.cn",
  timeout: 10000,
  withCredentials: true
});

// 用户Token
var token: OAuth2Token;

// Request 过滤器
axios.interceptors.request.use(request => {
  const { headers } = request;

  // OAuth2用户Token注入
  if (token) {
    const { header, value } = token.tokenData();
    headers[header] = value;
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
  config: {
    authorization(accessToken: string, tokenType: string) {
      token = new OAuth2Token(accessToken, tokenType);
    }
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
