import "webpack-dev-server";
import HTMLWebpackPlugin from "html-webpack-plugin";
const autoprefixer = require("autoprefixer");
import * as path from "path";
// import * as webpack from "webpack";
import * as config from "./config";

const { WebpackBase } = config;

export default {
  mode: WebpackBase.mode,
  devtool: WebpackBase.devtool,
  entry: "./pages/index.tsx",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: WebpackBase.filename,
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(process.cwd(), "./assets/index.html"),
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "swc-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.(scss)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: () => [autoprefixer] } },
          },
          "sass-loader",
        ],
      },
    ],
  },
  performance: { hints: false },
  devServer: { hot: true },
  stats: "minimal",
  optimization: WebpackBase.optimization,
};
