import type { Plugin } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { configMockPlugin } from "./mock"
import { configStyleImportPlugin } from "./styleImport"
import { configHtmlPlugin } from "./html"

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    vueJsx()
  ]

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  return vitePlugins
}
