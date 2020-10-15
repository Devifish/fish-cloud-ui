module.exports = {
  devServer: {
    port: 8080
  },
  runtimeCompiler: true,
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
