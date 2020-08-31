import { createApp } from "vue";
import Antd from "ant-design-vue";
import Router from "./router";
import Store from "./store";
import Axios from "./library/axios";
import App from "./App.vue";
import "ant-design-vue/dist/antd.less";

createApp(App)
  .use(Store)
  .use(Router)
  .use(Antd)
  .use(Axios)
  .mount("#app");
