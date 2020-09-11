import { createApp } from "vue";
import Router from "./router";
import Store from "./store";
import Axios from "./library/axios";
import Antd from "./library/ant-design";
import Interceptor from "./interceptor";
import App from "./App.vue";

const app = createApp(App);

// 加载组件
app.use(Store);
app.use(Router);
app.use(Axios);
app.use(Antd);

// 加载拦截器
Interceptor.setup(Router);

app.mount("#app");
