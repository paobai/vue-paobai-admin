import { computed } from "vue"
import { EChartsOption } from "echarts"
import useAppHook from "@/hooks/app"

// for code hints
// import { SeriesOption } from 'echarts';
// Because there are so many configuration items, this provides a relatively convenient code hint.
// When using vue, pay attention to the reactive issues. It is necessary to ensure that corresponding functions can be triggered, Typescript does not report errors, and code writing is convenient.
interface optionsFn {
  (isDark: boolean): EChartsOption
}

export default function useChartOption(sourceOption: optionsFn) {
  const appHook = useAppHook()
  const isDark = computed(() => {
    return appHook.darkAppTheme.value
  })
  // echarts support https://echarts.apache.org/zh/theme-builder.html
  // It's not used here
  // TODO echarts themes
  const chartOption = computed<EChartsOption>(() => {
    return sourceOption(isDark.value)
  })
  return {
    chartOption
  }
}
