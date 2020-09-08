import { createStore, createLogger, Plugin } from "vuex";
import auth from "./modules/auth";

const isProd = process.env.NODE_ENV == "production";
const plugins: Plugin<any>[] = [];

// 非生产环境添加日志
if (!isProd) {
  plugins.push(createLogger());
}

export default createStore({
  modules: {
    auth
  },
  plugins
});
