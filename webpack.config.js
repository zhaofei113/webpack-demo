const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引入vue

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //绝对路径
    filename: 'js/[name].[hash:8].js',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader', //将CSS转化成CommonJS模块
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require("autoprefixer") //自动添加前缀
            ]
          }
        },
        {
          loader: 'sass-loader' // 将Sass编译成CSS
        }
      ]
    }, {
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      use: [{
        loader: 'babel-loader',
      }]
    }, {
      test: /\.vue$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      use: {
        loader: 'vue-loader'
      }
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css" //css输出文件路径
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true, //script标签位于html文件的 body 底部
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 移除HTML中的注释
        removeAttributeQuotes: true //去掉属性两边的引号
      },
      chunksSortMode: 'dependency'
    }),
  ],
}
module.exports = config;