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
  }
};
