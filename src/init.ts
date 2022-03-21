import { App, Component, Directive } from "vue"
import config from "@/config"
import * as directives from "./directives"
import iconfont from "@/components/iconfont.vue"
import { setupStore } from "@/store"
import echarts from "@/plugins/echarts"
import "@/styles/index.less"
import { useArco } from "@/plugins/arco"
import "@/utils/prototype-plus"
export function initApp(app: App) {
  app.component("iconfont", iconfont as unknown as Component)
  setupStore(app)
  app.use(useArco)
  // 自定义指令
  Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key])
  })
  app.use(echarts)
}
