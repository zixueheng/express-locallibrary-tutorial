学习项目来自 https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/development_environment

## 创建项目：
mkdir myapp //创建项目目录
cd myapp    //进入项目目录
npm init  //生成package.json 文件
npm install express //安装express，会添加在 package.json 中 dependencies
npm install eslint --save-dev //在开发模式下安装eslint，实际会添加在package.json中devDependencies

### 运行项目：
除了在NPM中定义和获取依赖，你还可以在package.json中定义命名脚本，并且调用NPM的run-script命令来运行它们。
npm run start  //run是run-script的别名，实际命令是 npm run-script start
或者
npm run devstart //(start和devstart实际指向package.json中scripts对象指定的运行命令)

### 使用express generator生成项目
npm install express-generator -g //全局安装 express-generator
express helloworld //命令行到指定目录运行 "express 项目名" 来生成项目 express helloworld --view=pug(使用pug作为视图)
cd helloworld //进入项目目录
npm install   //安装依赖包

使用nodemon在代码有改动时重新启动项目
npm install nodemon -g //全局安装，因为它只是个工具