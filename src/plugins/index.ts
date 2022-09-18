import type { App } from "vue"

/**
 * @description 加载所有 Plugins
 * @param  {App} app 整个应用的实例
 */
export function loadAllPlugins(app: App) {
  const files = import.meta.globEager("./**/index.ts")
  Object.keys(files).forEach(key => {
    if (typeof files[key].default === "function") {
      files[key].default(app)
    } else {
      app.use(files[key].default)
    }
  })
}
