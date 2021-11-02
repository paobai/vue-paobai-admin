import "@/styles/index.scss"
import { createApp, Directive, Component } from "vue"
import App from "./App.vue"
import router from "./router"
import { setupStore } from "@/store"
// import { loadAllPlugins } from './plugins'
import { i18n } from "@/plugins/i18n"
import { useElementPlus } from "@/plugins/element-plus"
import { useArco } from "@/plugins/arco"
import iconfont from "@/components/iconfont.vue"
import * as directives from "@/directives"
import "@/assets/iconfont/iconfont.css"
import { initApp } from './init'


const app = createApp(App)
initApp(app)

// 自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})
if (iconfont) app.component("iconfont", iconfont as unknown as Component)
app.use(router).use(useArco).use(useElementPlus).use(i18n)
app.mount("#app")
