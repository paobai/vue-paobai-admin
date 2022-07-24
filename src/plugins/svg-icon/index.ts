// import * as vueCxglIcon from "@arco-iconbox/vue-cxgl-icon"
import type { App, Component } from "vue"
import Icon from "./index.vue"

// const componentPrefix = "A"
export function useIconSvg(app: App) {
  // Arco icon BOX
  // Object.keys(vueCxglIcon).forEach(key => {
  //   app.component(componentPrefix + key, (<any>vueCxglIcon)[key] as Component)
  // })
  app.component("SvgIcon", Icon as Component)
}
export default useIconSvg
