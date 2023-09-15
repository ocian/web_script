# web_script

package web assets easily and usful
让 web 工程的构建更简单

## 安装环境

1. Node.js
   1. 方式 1：从[官方网站](https://nodejs.org/zh-cn)下载
   2. 方式 2: 从[中国科学技术大学镜像站](https://mirrors.ustc.edu.cn/node/latest-v18.x/)下载
   3. 方式 3: 安装 [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)，并且[设置 nvm 的 Node.js 镜像为科大源](https://mirrors.ustc.edu.cn/help/node.html)
   4. 检查安装结果
      1. 查看 Node.js 版本 `node -v`
      2. 查看 npm 版本 `npm -v`
      3. 全局安装 npm 包 serve `npm i -g serve`
      4. 查看全局安装的 npm 包列表 `npm ls -g`

## 安装项目依赖

```sh
sh <<EOF
#DEPS_WEBPACK_BASE="webpack webpack-cli webpack-dev-server cross-env"
#DEPS_WEBPACK_HTML="html-webpack-plugin"
#DEPS_WEBPACK_TS="typescript ts-node @types/node @types/webpack tsconfig-paths"
#DEPS_WEBPACK_LOADER_CSS="autoprefixer css-loader postcss-loader sass sass-loader style-loader"
#DEPS_WEBPACK_LOADER_TS="typescript ts-loader"
DEPS_REACT="react react-dom @types/react @types/react-dom"
DEPS_REACT_ROUTER="react-router-dom localforage match-sorter sort-by"
DEPS_BOOTSTRAP="bootstrap @popperjs/core"
#npm i -D $DEPS_WEBPACK_BASE $DEPS_WEBPACK_HTML $DEPS_WEBPACK_TS $DEPS_WEBPACK_LOADER_CSS $DEPS_WEBPACK_LOADER_CSS $DEPS_WEBPACK_LOADER_TS
npm i $DEPS_REACT $DEPS_REACT_ROUTER $DEPS_BOOTSTRAP
EOF
```


