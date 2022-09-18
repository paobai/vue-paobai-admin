import type { BuildOptions } from "vite"
export function createViteBuildConfig(viteEnv: ViteEnv): BuildOptions {
  const { VITE_APP_VERSION } = viteEnv
  const packVersion = VITE_APP_VERSION.replace(/\./g, "-")
  return {
    brotliSize: false,
    emptyOutDir: true,
    outDir: `docs`,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    // cssCodeSplit: false, // css合并
    rollupOptions: {
      output: {
        entryFileNames: `assets/entry/[name][hash].js`,
        chunkFileNames: `assets/chunk/[name][hash].js`,
        assetFileNames: `assets/file/[name][hash].[ext]`,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor" //代码分割为第三方包
          }
          if (id.includes("views/modules")) {
            return "views-modules" //代码分割为业务视图
          }
          if (id.includes("views/common")) {
            return "views-common" //代码分割为common页面
          }
        }
      }
    }
  }
}
