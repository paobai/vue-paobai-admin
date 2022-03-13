import ArcoVue from "@arco-design/web-vue"
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
// @ts-ignore
import { getPresetColors } from "@arco-design/color/src/index"
import { App, Component } from "vue"
import "./arco-thme.less"

export const arcoDefaultColorName = "arcoblue"
export const arcoPresetColors = getPresetColors()
const componentPrefix = "A"
export function useArco(app: App) {
  app.use(ArcoVue, { componentPrefix })
  Object.keys(ArcoVueIcon).forEach(key => {
    app.component(componentPrefix + key, (<any>ArcoVueIcon)[key] as Component)
  })
}

// Change theme color
export function toggleTheme(dark: boolean) {
  if (dark) {
    document.body.setAttribute("arco-theme", "dark")
  } else {
    document.body.removeAttribute("arco-theme")
  }
}
