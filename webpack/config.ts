import * as webpack from "webpack";

interface TWebpackBase {
  mode: webpack.Configuration["mode"];
  devtool: webpack.Configuration["devtool"];
  optimization: webpack.Configuration["optimization"];
  filename: string;
}

const defaultValue = {
  mode: "developerment" as webpack.Configuration["mode"],
};

const mode = defaultValue.mode;

export const WebpackBase: TWebpackBase = {
  mode,
  devtool: mode === "production" ? "source-map" : "eval",
  optimization:
    mode === "production"
      ? undefined
      : { splitChunks: { chunks: "all" }, runtimeChunk: "single" },
  filename: mode === "production" ? "js/[name].[contenthash].js" : "[name].js",
};
