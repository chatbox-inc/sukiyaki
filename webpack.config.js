const webpack = require("webpack");
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');


var config = {

	entry: "./src/js/main.js",
	output: {
		path: __dirname,
		filename: "./res/js/bundle.js"
	},

	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.html$/, loader: "html" }
		]
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		extensions: ['', '.js', '']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
