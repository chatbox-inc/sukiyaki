const webpack = require("webpack");
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');


var config = {

	entry: "./src/index.js",
	output: {
		path: __dirname,
		filename: "./res/js/bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel!eslint',
				exclude: /node_modules/
			}
		]
	},

	node: {
		fs: 'empty'
	},

	resolve: {
		extensions: ['', '.js', '']
	},

	vue: {
		autoprefixer: {
			browsers: ['last 2 Chrome versions']
		},
		loaders: {
			sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
			scss: 'vue-style-loader!css-loader!sass-loader'
		}
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
