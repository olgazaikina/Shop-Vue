var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: ["./src/index.js"],
	//mode: 'development', //'production'
	mode: 'development',
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname,'dist')
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
				  name: '[path][name].[ext]'
				}
			}
		]
	 },
	  plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.bundle.css',
		})
	 ]
};