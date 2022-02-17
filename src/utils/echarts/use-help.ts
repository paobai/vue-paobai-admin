import { onMounted, unref, ref } from "vue"
import { Ref } from "vue"
import type { EChartsOption } from "echarts"
import echarts from "./index"
export const echartsCore = echarts

export function useECharts(
  elRef: Ref<HTMLDivElement | null>,
  options?: EChartsOption,
  theme: "light" | "dark" | "default" = "default"
) {
  // TODO: add resize event
  const chartInstance: Ref<echarts.ECharts | null> = ref(null)
  const setOption = (options: EChartsOption, clear: Boolean = true) => {
    clear && chartInstance.value?.clear()
    if (!chartInstance.value) {
      setTimeout(() => setOption(options, clear), 100)
    } else {
      chartInstance.value?.setOption(options)
    }
  }
  onMounted(() => {
    chartInstance.value = echarts.init(unref(elRef) as HTMLDivElement, theme)
    if (options) setOption(options)
  })
  return {
    setOption,
    chartInstance
  }
}
