const { resolve } = require("path");
//html-webpack-plugin
const HtmlWbPPlugin = require("html-webpack-plugin");
//mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//optimize-css-assets-webpack-plugin
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//vue vue-loader  vue-template-compiler
const VueLoaderPlugin = require("vue-loader/lib/plugin");
//clean-webpack-plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//const { VueLoaderPlugin } = require('vue-loader')
// const TerserWebpackPlugin = require('terser-webpack-plugin');
const CommonCssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [require("postcss-preset-env")],
    },
  },
};
//optimize-css-assets-webpack-plugin css压缩
//mini-css-extract-plugin css统一
module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],

  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        //vue-template-compiler  vue-loader
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              CommonCssLoader,
              //postcss postcss-loader postcss-preset-env
            ],
          },
          {
            test: /\.stylus$/,
            use: [
              MiniCssExtractPlugin.loader,
              //  "vue-style-loader",
              "css-loader",
              CommonCssLoader,
              "stylus-loader",
            ],
          },
          {
            test: /\.less$/,
            use: [
              // "style-loader",
              MiniCssExtractPlugin.loader,
              // "vue-style-loader",
              "css-loader",
              CommonCssLoader,

              //  "vue-style-loader",
              "less-loader",
            ],
          },
          {
            //url-loader file-loader
            test: /\.(jpg|png|gif)$/,
            loader: "url-loader",
            options: {
              limit: 2 * 1024,
              esModule: false,
              name: "[name].[ext]",
              outputPath: "imgs",
            },
          },
          {
            //babel-loader @babel/core @babel/preset-env  core-js js兼容
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    //按需加载
                    useBuiltIns: "entry",
                    corejs: {
                      version: 3,
                    },
                    targets: {
                      chrome: "60",
                      firefox: "60",
                      ie: "9",
                      safari: "10",
                      edge: "17",
                    },
                  },
                ],
              ],
              cacheDirectory: true,
            },
          },
          {
            //html-loader
            test: /\.html$/,
            loader: "html-loader",
            options: {
              esModule: false,
            },
          },
          {
            exclude: /\.(html|css|less|jpg|png|gif|js|vue)$/,
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "media",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),

    new HtmlWbPPlugin({
      template: "./src/index.html",
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注釋
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].css",
      chunkFilename: "[id].css",
    }),
    //压缩CSS
    new OptimizeCssAssetsPlugin(),
    //清理文件
    new CleanWebpackPlugin(),
  ],
  optimization: {
    //代码分割
    splitChunks: {
      chunks: "all",
    },
  },

  resolve: {
    alias: {
      $css: resolve(__dirname, "src/style"),
      $js: resolve(__dirname, "src/js"),
      vue$: "vue/dist/vue.js",
    },
    extensions: [".js", ".json", ".css"],
    modules: ["node_modules"],
  },
};
