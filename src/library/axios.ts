import Axios, { AxiosInstance } from "axios";
import { App } from "vue";

const axios = Axios.create({
  timeout: 10000,
  withCredentials: true
});

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

declare module "vue" {
  export interface ComponentCustomProperties {
    $http: AxiosInstance;
  }
}
