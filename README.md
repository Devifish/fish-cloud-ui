# Fish Cloud UI

> 基于 Vue3、Typescript、Ant Design Vue 框架开发<br/>
> 使用现代化编码 Composition API、箭头函数、Async/Await<br/>
> 提供对 Docker 容器环境运行的支持,可使用 Docker Compose、Kubernetes 编排

- 后端实现：https://github.com/Devifish/fish-cloud
- 在线体验：https://cloud.devifish.cn (admin/123456)

## 依赖环境

| 依赖           | 版本          |
| -------------- | ------------- |
| Typescript     | 3.9.3         |
| Vue.js         | 3.0.0         |
| Vuex           | 4.0.0-beta.4  |
| Vue Router     | 4.0.0-beta.11 |
| Ant Design Vue | 2.0.0-beta.9  |
| Axios          | 0.20.0        |

- 推荐使用 Node.js 12 及以上的运行/构建当前项目

## 模块说明

```
└── public/ -------------------------------------- 公共静态文件
└── src
     ├── api/ ------------------------------------ API接口
     ├── assets/ --------------------------------- 资源文件
     ├── components/ ----------------------------- 公共组件
     ├── interceptor/ ---------------------------- 路由拦截器
     ├── layouts/ -------------------------------- 页面布局
     ├── library/ -------------------------------- 三方依赖封装
     ├── router/ --------------------------------- 路由配置
     ├── store/ ---------------------------------- Vuex配置
     ├── utils/ ---------------------------------- 工具库
     ├── views/ ---------------------------------- 页面
     ├── App.vue --------------------------------- App.vue
     ├── index.d.ts ------------------------------ ts声明文件
     └── main.js --------------------------------- main入口
├──  babel.config.js ----------------------------- babel配置文件
├──  tsconfig.json ------------------------------- ts配置文件
└──  vue.config.js-------------------------------- vue配置文件
```

## 如何使用

```
git clone https://github.com/Devifish/fish-cloud-ui.git
cd fish-cloud-ui
npm install
npm run serve
```
