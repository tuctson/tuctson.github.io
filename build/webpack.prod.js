const baseConfig = require("./webpack.base.js");
const WebpackMerge = require("webpack-merge");
const { resolve } = require("path");

const prodConfig = {
  output: {
    path: resolve(__dirname, "../prod"),
  },
  mode: "production",
  devtool: "cheap-module-source-map",
};
module.exports = WebpackMerge.merge(baseConfig, prodConfig);
