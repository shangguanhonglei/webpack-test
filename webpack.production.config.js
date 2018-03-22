const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	devtool: false,
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  devServer:{
  	contentBase:'./build',
  	inline:true,
  	historyApiFallback:true,
    hot: true
  },
  module:{
  	rules:[
      /*babel插件处理es6代码*/
  		{
		  	test:/(\.js|\.jsx)$/,
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
      /*style-loader和css-loader插件处理css的引入及class类名的引入*/
      {
        test:/\.css$/,
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
            loader:"postcss-loader"
          }/*,
          {
            loader:"sass-loader"
          }*/
        ]
      }
  	]
  },
  plugins:[
    new webpack.BannerPlugin('版权所有，翻版必究，非商业用途请于作者联系'),
    new HtmlWebpackPlugin({
      template:__dirname+"/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin() //热加载插件
  ]

}