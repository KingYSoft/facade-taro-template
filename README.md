### 基于 Taro 的脚手架

目录结构：

```
├── config                          配置目录
|   ├── dev.js                      开发时配置
|   ├── index.js                    默认配置
|   └── prod.js                     打包时配置
├── src                             源码目录
|   ├── components                  公共组件目录
|   ├── iamges                      公共图片目录
|   ├── models                      公共类型实体
|   ├── pages                       页面文件目录
|   |   ├── index                   index 页面目录
|   |   |   ├── banner              页面 index 私有组件
|   |   |   ├── index.tsx           index 页面逻辑
|   |   |   └── index.scss          index 页面样式
|   ├── redux                       redux目录
|   |   ├── action                  action目录
|   |   ├── constants               constants目录
|   |   ├── reducers                reducers目录
|   |   ├── types                   types目录，redux类型
|   |   ├── store                   store配置目录
|   ├── services                    公共服务方法库
|   ├── app.scss                    项目总通用样式
|   └── app.tsx                     项目入口文件
|   ├── custom-variables.scss       公共sass变量
└── package.json
└── tsconfig.json                   ts配置文件
```

### 使用

使用 dotnet 命令，需要安装 dotnet core sdk https://dotnet.microsoft.com/download

安装 facade 命令工具，dotnet tool install --global Facade.ToolCLI
使用命令构建项目 facade init mydemo -t taro

### 主题

可以在 src/custom-variables.scss 中修改主题样式

### 说明

- "regenerator-runtime": "0.11.1"
- "eslint": "^6.0.0",
