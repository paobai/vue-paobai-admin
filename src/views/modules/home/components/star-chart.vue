<template>
  <a-spin class="start-chart" :loading="loading">
    <a-card class="first-card" title="star数(希望)">
      <chart v-if="!loading" :options="options"></chart>
    </a-card>
  </a-spin>
</template>

<script>
import { inject, defineComponent } from "vue"
import { graphic } from "echarts"
export default defineComponent({
  data() {
    let loading = inject("loading")
    let monthList = Array.from({ length: 12 }).map((item, index) => {
      return { value: [index + 1 + "月", Math.floor(Math.pow(1.2, index + 1) * 10 * (1 + 0.7 * Math.random()))] }
    })
    let options = {
      grid: {
        top: 30,
        bottom: 20,
        left: 50,
        right: 50,
        containLabel: false
      },
      tooltip: {
        show: true,
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: false
        }
      },
      yAxis: {
        name: "star数（个）",
        type: "value"
      },
      series: [
        {
          data: monthList,
          type: "line",
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "rgba(30, 231, 255, 1)"
              },
              {
                offset: 0.5,
                color: "rgba(36, 154, 255, 1)"
              },
              {
                offset: 1,
                color: "rgba(111, 66, 251, 1)"
              }
            ])
          },
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(17, 126, 255)"
              },
              {
                offset: 1,
                color: "rgb(17, 128, 255, 0)"
              }
            ])
          },
          smooth: true
        }
      ]
    }
    return { loading, options }
  }
})
</script>

<style lang="less" scoped>
.start-chart {
  width: 100%;
  height: 100%;
}
</style>
