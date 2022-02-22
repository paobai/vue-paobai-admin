// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

import { resolve } from "path"
import { UserConfigExport, ConfigEnv, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { warpperEnv } from "./build/utils"
import { createProxy } from "./build/proxy"
import { viteMockServe } from "vite-plugin-mock"
import styleImport from "vite-plugin-style-import"

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  "@": pathResolve("src"),
  //解决开发环境下的警告 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
  "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
}

const root: string = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = warpperEnv(
    loadEnv(mode, root)
  )
  const prodMock = true
  return {
    /**
     * 基本公共路径
     * /manages/ 可根据项目部署域名的后缀自行填写（全局搜/manages/替换）
     * @default '/'
     */
    base: process.env.NODE_ENV === "production" ? "./" : VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/_variables.module.less";',
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      /**
       * 端口号
       * @default 3000
       */
      host: "0.0.0.0",
      port: VITE_PORT,
      // 本地跨域代理
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          {
            libraryName: "@arco-design/web-vue",
            esModule: true,
            resolveStyle: name => {
              // css
              return `@arco-design/web-vue/es/${name}/style/css.js`
              // less
              return `@arco-design/web-vue/es/${name}/style/index.js`
            }
          }
        ]
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        prodEnabled: command !== "serve" && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true
      })
    ],
    optimizeDeps: {
      include: []
    },
    build: {
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  }
}
