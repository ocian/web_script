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

## 运行项目

### 添加 submodule

首先需要把这份仓库的代码放置到主工程的 scripts 目录，才可以正常使用。

```sh
git clone git@github.com:ocian/web_script.git scripts
git submodule add git@github.com:ocian/web_script.git scripts
```

### 安装项目依赖

```sh
npm i -D zx
npx zx scripts/main.mjs --install all # 安装 npm 依赖
```

### 生成项目基础目录结构

```sh
npx zx scripts/main.mjs --init
```

### 运行项目

```sh
npx zx scripts/main.mjs --run dev
```

### 构建项目

```sh
npx zx scripts/main.mjs --run build
```

### 使用 npm script

> 这是一个可选的步骤

运行和构建两个步骤，可以通过 npm script 来运行，需要把下面三行手动写入到项目的 package.json 文件的 scripts 条目中。

```json
{
   "scripts": {
      "start": "npm run dev",
      "dev": "zx scripts/main.mjs --run dev",
      "build": "zx scripts/main.mjs --run build"
   }
}
```

* 运行项目，可以使用 `npm start` 或者 `npm run dev`
* 构建项目，可以使用 `npm run build`