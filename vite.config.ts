// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

import { resolve } from "path";
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { warpperEnv } from "./build/utils";
import { createProxy } from "./build/proxy";
import { viteMockServe } from "vite-plugin-mock";
import styleImport from "vite-plugin-style-import";

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "@": pathResolve("src"),
  //解决开发环境下的警告 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
  "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
};

const root: string = process.cwd();

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = warpperEnv(
        loadEnv(mode, root)
    );
  let prodMock = true;
  return {
    /**
     * 基本公共路径
     * /manages/ 可根据项目部署域名的后缀自行填写（全局搜/manages/替换）
     * @default '/'
     */
    base:
        process.env.NODE_ENV === "production" ? "/manages/" : VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    css: {
      preprocessorOptions: {
        scss: {
        },
        less: {
          additionalData: '@import "./src/styles/_variables.module.less";',
          modifyVars: {
          },
          javascriptEnabled: true
        }
      },
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      /**
       * 端口号
       * @default 3000
       */
      host: '0.0.0.0',
      port: VITE_PORT,
      // 本地跨域代理
      proxy: createProxy(VITE_PROXY),
    },
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          // 按需加载element-plus
          {
            libraryName: "element-plus",
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`;
            },
          },
          // 按需加载vxe-table
          {
            libraryName: "vxe-table",
            esModule: true,
            resolveComponent: (name) => `vxe-table/es/${name}`,
            resolveStyle: (name) => `vxe-table/es/${name}/style.css`,
          },
        ],
      }),
      viteMockServe({
        mockPath: "mock",
          localEnabled: command === "serve",
          prodEnabled: command !== "serve" && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
      }),
    ],
    optimizeDeps: {
      include: [
        "element-plus/lib/locale/lang/zh-cn",
        "element-plus/lib/locale/lang/en",
        "vxe-table/lib/locale/lang/zh-CN",
        "vxe-table/lib/locale/lang/en-US",
      ],
    },
    build: {
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  };
};
