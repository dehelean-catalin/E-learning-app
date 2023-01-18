const path = require("path");

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				exclude: /(node_modules)/,
				test: /\.([cm]?ts|tsx)$/,
				loader: "ts-loader",
				options: {
					additionalData: '@import "variables.scss";',
					sassOptions: {
						includePaths: ["src/layout/variables.scss"],
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		fallback: { console: require.resolve("console-browserify") },
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
