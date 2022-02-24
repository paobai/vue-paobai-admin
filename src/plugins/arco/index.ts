import ArcoVue from "@arco-design/web-vue"
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
import { App, Component } from "vue"
import "./arco-thme.less"

const componentPrefix = "A"
export function useArco(app: App) {
  app.use(ArcoVue, { componentPrefix })
  Object.keys(ArcoVueIcon).forEach(key => {
    app.component(componentPrefix + key, (<any>ArcoVueIcon)[key] as Component)
  })
}
