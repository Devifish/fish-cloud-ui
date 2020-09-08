const isProd = process.env.NODE_ENV == "production";
const cdn = {
  enable: isProd,
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    "ant-design-vue": "antd",
    axios: "axios"
  },
  css: [],
  js: [
    "https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.10/dist/vue.runtime.global.prod.js",
    "https://cdn.jsdelivr.net/npm/vuex@4.0.0-beta.4/dist/vuex.global.prod.js",
    "https://cdn.jsdelivr.net/npm/vue-router@4.0.0-beta.9/dist/vue-router.global.prod.js",
    "https://cdn.jsdelivr.net/npm/ant-design-vue@2.0.0-beta.8/dist/antd.min.js",
    "https://cdn.jsdelivr.net/npm/axios@0.20.0/dist/axios.min.js"
  ]
};

module.exports = {
  devServer: {
    port: 8080
  },
  productionSourceMap: false,
  css: {
    sourceMap: false,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {}
        }
      }
    }
  },
  configureWebpack: {
    externals: cdn.enable ? cdn.externals : []
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      const options = args[0];
      options.js = cdn.enable ? cdn.js : [];
      options.css = cdn.enable ? cdn.css : [];
      return args;
    });
  }
};
