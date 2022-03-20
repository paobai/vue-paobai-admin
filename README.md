## 简介

PAOBAI 是一个免费开源的中后台模版。使用了最新的`vue3`,`vite2`,`TypeScript`, `pinia`等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。

## 原由
为何开发？目前前端框架很多了为什么还要在开发一个呢。目前我看到过几个前端admin，
比如vben应该是最广为人知的，但是里面的代码对新手不是很友好。包括对国内开发者有很多东西是用不到的，但是非常影响框架。
比如vue-il8n国际化，这个对项目耦合度太高了。我相信开发给国内用户的人来说不需要国际化，那就非常不希望代码里面出现$t这个东西存在了。
加之很多框架对用户权限菜单支持不是特别好。以及目前没有（可能我不知道）基于Arco Design的中后台模版。所以我打算开发一个这样的框架。
## 特性

- **最新技术栈**：Vue 全家桶，基于`Vue3`, `Vite`, `Vue Router` 开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **UI**：UI库来自字节跳动开源的`Arco Design`
- **Mock 数据**： 内置 Mock 数据方案 搭配`mockjs`,`vite-plugin-mock`插件食用
- **主题**：可配置的主题
- **布局**：内置多种布局方式，满足多方需求
- **权限** 内置完善的根据API动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 预览
以下带宽都很慢
- [PAOBAI](http://110.40.186.235/) - 完整版中文站点
- [PAOBAI-gh-pages](https://zheng_yc.gitee.io/paobai) - gitee 站点

测试账号: paobai/paobai

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Arco-Design-Vue](https://arco.design/vue/docs/start) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法


## 安装使用

- 获取项目代码

```bash
git clone https://github.com/paobai/paobai.git
```

- 安装依赖

```bash
cd paobai

npm install
```

- 运行

```bash
npm run dev
```

- 打包

```bash
npm run build
```

## 项目地址

- [PAOBAI](https://gitee.com/zheng_yc/paobai) gitee
- [PAOBAI](https://github.com/paobai/paobai) github

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/paobai/paobai/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

    - `feat` 增加新功能
    - `fix` 修复问题/BUG
    - `style` 代码风格相关无影响运行结果的
    - `perf` 优化/性能提升
    - `refactor` 重构
    - `revert` 撤销修改
    - `test` 测试相关
    - `docs` 文档/注释
    - `chore` 依赖更新/脚手架配置修改等
    - `workflow` 工作流改进
    - `ci` 持续集成
    - `types` 类型定义文件更改
    - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

## 相关仓库
- [vue-vben-admin](https://github.com/anncwb/vue-vben-admin) - vben
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - 用于组件库样式按需引入
- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - 用于本地及开发环境数据 mock

## 维护者

[@Zheng_yc](https://gitee.com/zheng_yc)

## 交流

`PAOBAI` 是完全开源免费的项目，在帮助开发者更方便地进行中大型管理系统开发，同时也提供 QQ 交流群使用问题欢迎在群内提问。

- QQ 群 `暂无`

## License

[MIT © PAOBAI-2022](./LICENSE)
