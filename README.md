## webpack-test
- webpack 安装
- sourceMap 配置
	> devtool: 'eval-source-map'
- webpack-dev-server本地服务器搭建
	> node服务提供的一个小型的本地服务器
- Babel 安装与配置
	> Babel是webpack的一个loader,用来处理es6代码,需要配置.babelrc文件
- style-loader及css-loader
	> 处理css的模块引入及class类名引入
- postcss-loader和autoprefixer配合使用给css自动加前缀
	> 例如：border-raduis => -webkit-border-raduis
- sass-loader处理sass文件,同过style-loader和css-loader与sass-loader链式调用
- webpack.BannerPlugin插件为js文件增加版权声明
- HtmlWebpackPlugin插件帮助生成html文件
	> 自动添加script和link标签引入js和css以及根据模板文件动态生成html文件
- CleanWebpackPlugin清除目录中文件
	> 可以在每次生成文件前执行一次清除文件目录

- [webpack中文文档](http://www.css88.com/doc/webpack/loaders/sass-loader/ "webpack中文文档")
- [webpack入门文档](https://segmentfault.com/a/1190000006178770 "webpack入门文档")