<template>
  <a-card :loading="loading" class="first-card" title="项目占比(希望)">
    <chart v-if="!loading" :options="options"></chart>
  </a-card>
</template>

<script>
import { inject, defineComponent } from "vue"
import useChartOption from "@/hooks/chart-option"

export default defineComponent({
  data() {
    let loading = inject("loading")
    // let monthList = Array.from({ length: 12 }).map((item, index) => {
    //   return { value: [index + 1 + "月", Math.floor(Math.pow(1.2, index + 1) * 30 * (1 + 0.7 * Math.random()))] }
    // })
    const { chartOption: options } = useChartOption(isDark => {
      return {
        legend: {
          left: "center",
          data: ["Star数", "Fork数", "Watching数"],
          bottom: 0,
          icon: "circle",
          itemWidth: 8,
          textStyle: {
            color: isDark ? "rgba(255, 255, 255, 0.7)" : "#4E5969"
          },
          itemStyle: {
            borderWidth: 0
          }
        },
        tooltip: {
          show: true,
          trigger: "item"
        },
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "40%",
              style: {
                text: "项目占比",
                textAlign: "center",
                fill: isDark ? "#ffffffb3" : "#4E5969",
                fontSize: 14
              }
            },
            {
              type: "text",
              left: "center",
              top: "50%",
              style: {
                text: "928,531",
                textAlign: "center",
                fill: isDark ? "#ffffffb3" : "#1D2129",
                fontSize: 16,
                fontWeight: 500
              }
            }
          ]
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            label: {
              formatter: "{d}%",
              fontSize: 14,
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "#4E5969"
            },
            itemStyle: {
              borderColor: isDark ? "#232324" : "#fff",
              borderWidth: 1
            },
            data: [
              {
                value: [148564],
                name: "Star数",
                itemStyle: {
                  color: isDark ? "#3D72F6" : "#249EFF"
                }
              },
              {
                value: [334271],
                name: "Fork数",
                itemStyle: {
                  color: isDark ? "#A079DC" : "#313CA9"
                }
              },
              {
                value: [445694],
                name: "Watching数",
                itemStyle: {
                  color: isDark ? "#6CAAF5" : "#21CCFF"
                }
              }
            ]
          }
        ]
      }
    })
    return { loading, options }
  }
})
</script>

<style lang="less" scoped></style>
