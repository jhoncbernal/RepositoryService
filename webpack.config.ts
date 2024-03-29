import path from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import NodemonPlugin from "nodemon-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const NODE_ENV: "development" | "production" | "none" =
  (process.env.NODE_ENV as any) || "production";

const config: webpack.Configuration = {
  entry: [path.resolve(__dirname, "src")],
  mode: NODE_ENV,
  watch: NODE_ENV === "development",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.hbs?$/,
        use: "handlebars-loader",
      },
    ],
  },
  devtool: "source-map",
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      // Define other environment variables here as needed
    }),
    new ESLintPlugin({
      extensions: [".tsx", ".ts", ".js"],
    }),
    new NodemonPlugin({
      ignore: ["./node_modules"],
      verbose: true,
      delay: 500,
    }),
  ],
  stats: {
    warnings: true,
  },
};

export default config;
