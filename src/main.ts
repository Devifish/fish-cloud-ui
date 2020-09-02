import { createApp } from "vue";
import Router from "./router";
import Store from "./store";
import Axios from "./library/axios";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.less";

createApp(App)
  .use(Store)
  .use(Router)
  .use(Axios)
  .use(Antd)
  .mount("#app");
