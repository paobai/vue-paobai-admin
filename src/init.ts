import { App, Component, Directive } from "vue"
import * as directives from "./directives"
import iconfont from "@/components/iconfont.vue"
import { setupStore } from "@/store"
import "@/styles/index.less"
import { loadAllPlugins } from "@/plugins"
import "@/utils/prototype-plus"
import "virtual:svg-icons-register"
import "animate.css"
export function initApp(app: App) {
  app.component("Iconfont", iconfont as unknown as Component)
  setupStore(app)
  // load插件
  loadAllPlugins(app)
  // 自定义指令
  Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key])
  })
}
