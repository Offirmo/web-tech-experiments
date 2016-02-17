var webpack = require('webpack');
var webpackLoadPlugins = require('webpack-load-plugins');
var plugins = webpackLoadPlugins();

module.exports = {
	resolve: {
		root: [path.join(__dirname, "bower_components")]
	},
	entry: "./browser/webpack/tool_webpack_001_entry.js",
	output: {
		path: __dirname,
		filename: "./browser/webpack/tool_webpack_001_generated_bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" }
		]
	}
};
