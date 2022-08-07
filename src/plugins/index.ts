/*
 * @Description: 加载插件文件
 * @Author: ZY
 * @Date: 2020-12-19 11:53:00
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-23 16:49:30
 */
import { App } from "vue"

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
