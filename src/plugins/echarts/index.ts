import * as echarts from "echarts/core"
import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
import Chart from "./chart/index.vue"
import { App } from "vue"

import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  GraphicComponent,
  RadarComponent
} from "echarts/components"

const { use, registerTheme } = echarts

use([
  PieChart,
  BarChart,
  LineChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  GraphicComponent,
  RadarComponent,
  RadarChart
])

// 自定义主题
import theme from "./theme.json"
registerTheme("ovilia-green", theme)

export default {
  install(Vue: App) {
    Vue.component("Chart", Chart)
  }
}
