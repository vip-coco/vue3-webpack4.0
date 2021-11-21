const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
 
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  }, 
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        loader: 'babel-loader'
        },
    ]
  },
  plugins: [  
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: '手搭 Vue 开发环境'
    }), 
    // 添加 VueLoaderPlugin 插件
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, './dll/vue.js'),
      publicPath: 'js', //资源引入公共路径前缀
      outputPath: './js'//输出路径设置
      //path: path.resolve(__dirname, './js'),
    }),
  ],
  devServer: {
    static: path.join(__dirname, './dist'),
    //contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080
  }
}