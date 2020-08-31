import Axios from "axios";
import { App } from "vue";

const axios = Axios.create({
  timeout: 10000,
  withCredentials: true
});

export default {
  install(app: App) {
    app.config.globalProperties.$http = axios;
  }
};
