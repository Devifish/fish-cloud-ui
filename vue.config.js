const useCDN = eval(process.env.USE_CDN);
const cdnData = {
  library: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
    moment: "moment"
  },
  css: [],
  js: [
    "https://cdn.jsdelivr.net/npm/vue@3.0.6/dist/vue.runtime.global.prod.js",
    "https://cdn.jsdelivr.net/npm/vuex@4.0.0/dist/vuex.global.prod.js",
    "https://cdn.jsdelivr.net/npm/vue-router@4.0.3/dist/vue-router.global.prod.js",
    "https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js",
    "https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment-with-locales.min.js"
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
    externals: useCDN ? cdnData.library : []
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      const options = args[0];
      options.js = useCDN ? cdnData.js : [];
      options.css = useCDN ? cdnData.css : [];
      return args;
    });
  }
};
