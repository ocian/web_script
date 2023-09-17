#!/usr/bin/env zx

import "zx/globals";
import getWebpackConfigBase from "./webpack.config.js";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 安装功能
const fnInstall = async (installType = "all") => {
  const DEPS_WEBPACK_BASE = `webpack webpack-cli webpack-dev-server`;
  const DEPS_WEBPACK_HTML = `html-webpack-plugin`;
  const DEPS_WEBPACK_TS = `typescript ts-node @types/node @types/webpack tsconfig-paths`;
  const DEPS_WEBPACK_LOADER_TS = `typescript ts-loader`;
  const DEPS_WEBPACK_LOADER_CSS = `autoprefixer css-loader postcss-loader sass sass-loader style-loader`;
  const DEPS_SCRIPTS = `zx cross-env`;
  const DEPS_REACT = `react react-dom @types/react @types/react-dom`;
  const DEPS_REACT_ROUTER = `react-router-dom localforage match-sorter sort-by`;
  const DEPS_BOOTSTRAP = `bootstrap @popperjs/core`;

  const installReact = async () => $`npm i ${DEPS_REACT.split(" ")}`;
  const installBootstrap = async () => $`npm i ${DEPS_BOOTSTRAP.split(" ")}`;
  const installBase = async () => {
    await $`npm i -D ${[
      DEPS_WEBPACK_BASE,
      DEPS_WEBPACK_HTML,
      DEPS_WEBPACK_TS,
      DEPS_WEBPACK_LOADER_TS,
      DEPS_WEBPACK_LOADER_CSS,
      DEPS_SCRIPTS,
    ]
      .join(" ")
      .split(" ")}`;
  };
  switch (installType) {
    case "react":
      await installReact();
      break;
    case "bootstrap":
      await installBootstrap();
      break;
    case "base":
      await installBase();
      break;
    case "all":
      await installBase();
      await installReact();
  }
};

// 工程的初始化，目前只包含目录结构
const fnProjectInit = async () => {
  await fs.copy("./scripts/templates/assets", "./assets");
  await fs.copy("./scripts/templates/components", "./components");
  await fs.copy("./scripts/templates/html", "./html");
  await fs.copy("./scripts/templates/pages", "./pages");
  await fs.copy("./scripts/templates/utils", "./utils");
  await fs.copy("./scripts/templates/tsconfig.json", "./tsconfig.json");
  await fs.copy("./scripts/templates/.projectrc", "./.projectrc");
};

// 工程运行
const fnRun = async (argument) => {
  const projectrc = await fs.readJSON("./.projectrc");
  console.log("projectrc", projectrc);

  const mergeWebpackConfig = ({ mode } = { mode: "development" }) => {
    const { default: _default, pages } = projectrc;

    const entryPages = {};
    const pluginsHtml = [];

    Object.entries(pages).map(([k, v]) => {
      entryPages[k] = v?.entries || `./pages/${k}`;
      pluginsHtml.push(
        new HtmlWebpackPlugin({
          filename: `${k}.html`,
          template: `${v?.html ?? _default?.html}`,
          chunks: [k],
          templateParameters: (compilation, assets, assetTags, options) => {
            const _options = {
              ...(v?.templateParameters ?? _default?.templateParameters ?? {}),
            };

            return {
              compilation: compilation,
              webpackConfig: compilation.options,
              htmlWebpackPlugin: {
                tags: assetTags,
                files: assets,
                options: options,
              },
              templateParameters: _options, // 我就加个模板变量，何苦这样为难我
            };
          },
        })
      );
    });

    const configBase = getWebpackConfigBase({ mode });

    return {
      ...configBase,
      entry: {
        ...(configBase?.entry || {}),
        ...entryPages,
      },
      plugins: [...(configBase.plugins || []), ...pluginsHtml],
    };
  };

  if ("dev" === argument) {
    const compiler = webpack(mergeWebpackConfig({ mode: "development" }));
    const devServerOptions = { hot: true };
    const server = new WebpackDevServer(devServerOptions, compiler);

    await server.start();
  } else if ("build" === argument)
    webpack(mergeWebpackConfig({ mode: "production" }));
};

// 展示帮助信息
const fnEchoHelp = async () => {
  echo`=========== 帮助信息 ==========`;
  echo`= 这是一个 web 项目的构建工具 =`;
  echo`= --install  : 安装依赖       =`;
  echo`= --init     : 工程初始化     =`;
  echo`= --run dev  : 工程运行       =`;
  echo`= --run build: 工程构建       =`;
};

const main = async () => {
  const {
    install: installArgument,
    init: initCommand,
    run: runArgument,
    help: helpArgument,
  } = argv;
  // console.log(argv);

  // 安装依赖
  if (installArgument && ["all", "base", "react"].includes(installArgument)) {
    await fnInstall(installArgument);
  }

  // 工程初始化
  else if (initCommand) {
    await spinner("doing...", fnProjectInit);
    echo`finished`;
  }

  // 工程运行
  else if (runArgument) await fnRun(runArgument);
  // 展示帮助信息
  else if (helpArgument) await fnEchoHelp();
};

main();
