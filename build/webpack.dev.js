const baseConfig = require("./webpack.base.js");
const WebpackMerge = require("webpack-merge");
const { resolve } = require("path");

const Webpack = require("webpack");
const devConfig = {
  output: {
    path: resolve(__dirname, "../dev"),
  },
  mode: "development",
  devServer: {
    //webpack-dev-server   启动 webpack serve
    contentBase: resolve(__dirname, "../dev"),
    //gzip压缩
    compress: true,
    host: "localhost",
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: "eval-cheap-source-map",
  plugins: [new Webpack.HotModuleReplacementPlugin()],
};

module.exports = WebpackMerge.merge(baseConfig, devConfig);
