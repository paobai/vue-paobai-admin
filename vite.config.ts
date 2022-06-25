import { resolve } from "path"
import { UserConfigExport, ConfigEnv, loadEnv } from "vite"
import { wrapperEnv } from "./build/utils"
// import { createProxy } from "./build/proxy"
import { createVitePlugins } from "./build/vite/plugin"
import { createViteBuildConfig } from "./build/vite/build"

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  "@": pathResolve("src")
}

const root: string = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_HOST, VITE_PORT, VITE_PUBLIC_PATH } = viteEnv
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
      host: VITE_HOST,
      port: VITE_PORT
      // 本地跨域代理
      // proxy: createProxy(VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: []
    },
    build: createViteBuildConfig(viteEnv),
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  }
}
