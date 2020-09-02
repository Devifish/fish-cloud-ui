import { createApp } from "vue";
import Router from "./router";
import Store from "./store";
import Axios from "./library/axios";
import Antd from "./library/ant-design";
import App from "./App.vue";

createApp(App)
  .use(Store)
  .use(Router)
  .use(Axios)
  .use(Antd)
  .mount("#app");
