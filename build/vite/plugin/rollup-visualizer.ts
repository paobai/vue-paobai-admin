import { visualizer } from "rollup-plugin-visualizer"

export function configRollupVisualizerPlugin() {
  return visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true
  })
}
