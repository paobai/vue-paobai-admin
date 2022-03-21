import { resolve } from "path"
import { UserConfigExport, ConfigEnv, loadEnv } from "vite"
import { wrapperEnv } from "./build/utils"
// import { createProxy } from "./build/proxy"
import { createVitePlugins } from "./build/vite/plugin"

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
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv
  const isBuild = command === "build"
  return {
    /**
     * 基本公共路径
     * /manages/ 可根据项目部署域名的后缀自行填写（全局搜/manages/替换）
     * @default '/'
     */
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    css: {
      preprocessorOptions: {
        less: {
          // 这个相当于在每个less 里面增加这些变量。但是如果less文件里面已经有这个变量，则使用文件里面的。
          additionalData: '@import "./src/styles/_variables.module.less";',
          // 这个相当于在每个less文件里面增加这些变量，但是如果less文件里面已经有这个变量，优先使用modifyVars里面的。
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
      port: VITE_PORT
      // 本地跨域代理
      // proxy: createProxy(VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: []
    },
    build: {
      brotliSize: false,
      // 消除打包大小超过500kb警告
      outDir: `docs`,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          entryFileNames: `assets/entry/[name][hash].js`,
          chunkFileNames: `assets/chunk/[name][hash].js`,
          assetFileNames: `assets/file/[name][hash].[ext]`
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  }
}
