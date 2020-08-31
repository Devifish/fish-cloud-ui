const isProd = process.env.NODE_ENV == "production";
const cdn = {
  enable: isProd,
  externals: {
    axios: "axios"
  },
  css: [],
  js: ["https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js"]
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
          javascriptEnabled: true
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
