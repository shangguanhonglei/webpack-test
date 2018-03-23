const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	devtool: false,
  entry:  {
    main:__dirname + "/app/main.js",//已多次提及的唯一入口文件 
    a:__dirname +"/app/a.js",//
    b:__dirname +"/app/b.js",
    c:__dirname +"/app/c.js"
  },
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "[name]-[hash].js"//打包后输出文件的文件名
    /*publicPath:'http://cdn.com/'*/ // 最终打包html文件中引用文件的路径

  },
  devServer:{
  	contentBase:'./dist',
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
      filename:__dirname+"/build/index.html",
      title:"hello webpack!",
      template:__dirname+"/app/index.tmpl.html",
      date:new Date(),
      chunks:['main'],
      minify:{
        removeComments:true,//删除注释
        collapseWhitespace:true//删除空格
      }
    }),
    new HtmlWebpackPlugin({
      filename:__dirname+"/build/a.html",
      title:"hello a!",
      template:__dirname+"/app/index.tmpl.html",
      date:new Date(),
      chunks:['a']
    }),
    new HtmlWebpackPlugin({
      filename:__dirname+"/build/b.html",
      title:"hello b!",
      template:__dirname+"/app/index.tmpl.html",
      date:new Date(),
      chunks:['b']
    }),
    new HtmlWebpackPlugin({
      filename:__dirname+"/build/c.html",
      title:"hello c!",
      template:__dirname+"/app/index.tmpl.html",
      date:new Date(),
      chunks:['c']
    }),

    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]

}