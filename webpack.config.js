// import "webpack-dev-server";
// import HTMLWebpackPlugin from "html-webpack-plugin";
import autoprefixer from "autoprefixer";
import * as path from "path";

export default (config = { mode: "development" }) => {
  const mode = config.mode;
  const devtool = mode === "production" ? "source-map" : "eval";
  const optimization =
    mode === "production"
      ? undefined
      : { splitChunks: { chunks: "all" }, runtimeChunk: "single" };
  const filename =
    mode === "production" ? "js/[name].[contenthash].js" : "[name].js";

  return {
    mode,
    devtool,
    entry: {
      vendor: ["react-dom"],
    },
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename,
      clean: true,
    },
    plugins: [],
    resolve: { extensions: [".js", ".ts", ".jsx", ".tsx"] },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
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
    stats: "minimal",
    optimization,
  };
};
