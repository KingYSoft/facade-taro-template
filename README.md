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
|   ├── store                       store配置目录
|   ├── utils                       公共方法库
|   ├── app.scss                    项目总通用样式
|   └── app.tsx                     项目入口文件
└── package.json
└── tsconfig.json                   ts配置文件
```
