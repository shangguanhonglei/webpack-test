const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/start",//打包后的文件存放的地方
    filename: "[name]-[hash].js"//打包后输出文件的文件名
  },
  devServer:{//webpack-dev-server
  	contentBase:'./start',//表示为哪个目录提供本地服务器
  	inline:true,//源文件改变时会自动刷新页面
  	historyApiFallback:true//不跳转，所有的跳转将指向index.html
    //port 监听的端口
  },
  module:{
  	rules:[
    /*babel插件处理es6代码*/
    {
     test:/(\.js|\.jsx)$/,//正则
     use:{
      loader:'babel-loader',
      options:{
       presets:[
       'env','react'
       ]
     }
   },
   exclude:/node_modules/
 },
 
 {
  test:/\.css$/,
  use:[
  {
    loader:"style-loader"//将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中
  },
  {
    loader:"css-loader",//css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能
    options: {
                modules: true, // 指定启用css modules
                localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
              }
            },
            {
              loader:"postcss-loader"
            }
          /*,
          {
            loader:"sass-loader"
          }*/
          ]
        },
        {

          test:/\.scss$/,
          use:[
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader",
            options: {
                modules: true, // 指定启用css modules
                localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
              }
            },
            {
              loader:"sass-loader"
            }
            ]
          },
          {
            test:/\.tpl$/,
            use:[
            {
              loader:"html-loader"
            }
            ]
          },
          {
            test:/(\.jpg|\.png)$/i,
            use:[
            {
              loader:"file-loader",
              options:{
                name:'[name]-[hash].[ext]',
                outputPath: '../start/'
              }
            }
            ]
          }
          ]
        },
        //loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用
  plugins:[
    new webpack.BannerPlugin('版权所有，翻版必究，非商业用途请于作者联系'),
    new HtmlWebpackPlugin({//生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用
      template:__dirname+"/app/index.html"
    }),
    new CleanWebpackPlugin('start/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]

}