const path = require("path");

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.([cm]?ts|tsx)$/,
				loader: "ts-loader",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
