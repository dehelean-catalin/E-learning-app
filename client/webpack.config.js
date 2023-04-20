const path = require("path");

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	devtool: "inline-source-map",

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "esbuild-loader",
				options: {
					target: "es2015",
				},
			},

			{
				test: /\.(s*)css$/,
				use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: "url-loader",
			},
			{
				test: /\.(ico|jpe?g|png|gif|webp|svg|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
				loader: "file-loader",
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
		modules: [path.resolve(__dirname, "src"), "node_modules"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
