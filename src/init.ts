import { App, Component, Directive } from "vue"
import * as directives from "./directives"
import iconfont from "@/components/iconfont.vue"
import { setupStore } from "@/store"
import echarts from "@/plugins/echarts"
import "@/styles/index.less"
import { useArco } from "@/plugins/arco"
import "@/utils/prototype-plus"
import "animate.css"
export function initApp(app: App) {
  app.component("Iconfont", iconfont as unknown as Component)
  setupStore(app)
  app.use(useArco)
  // 自定义指令
  Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key])
  })
  app.use(echarts)
}
