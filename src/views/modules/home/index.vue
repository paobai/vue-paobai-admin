<template>
  <div class="app-container">
    <a-space direction="vertical" :size="12" fill>
      <a-row :gutter="[16, 16]" justify="start">
        <a-col :xs="24" :md="24" :xl="12" style="height: 370px">
          <tip></tip>
        </a-col>
        <a-col :xs="24" :md="24" :xl="12" style="height: 370px">
          <welcome></welcome>
        </a-col>
        <a-col :xs="24" :md="12" :xl="8" style="height: 400px">
          <star-chart></star-chart>
        </a-col>
        <a-col :xs="24" :md="12" :xl="8" style="height: 400px">
          <view-chart></view-chart>
        </a-col>
        <a-col :xs="24" :md="24" :xl="8" style="height: 400px">
          <comp-chart></comp-chart>
        </a-col>
        <a-col>
          <a-row :gutter="[16, 16]">
            <a-col flex="auto">
              <a-card class="first-card" title="操作方式">
                <a-row align="center"></a-row>
              </a-card>
            </a-col>
            <a-col flex="400px">
              <a-card class="first-card" title="快捷导航">
                <a-row align="center"></a-row>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, readonly } from "vue"
import router from "@/router"

import welcome from "./components/welcome.vue"
import tip from "./components/tip.vue"
import starChart from "./components/star-chart.vue"
import viewChart from "./components/view-chart.vue"
import compChart from "./components/comp-chart.vue"

export default defineComponent({
  name: "App",
  components: {
    welcome,
    tip,
    starChart,
    viewChart,
    compChart
  },
  setup() {
    let goHome = function () {
      router.push({ name: "home" })
    }
    let options = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line"
        }
      ]
    }
    let loading = ref(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)
    provide("loading", readonly(loading))
    return { goHome, options }
  }
})
</script>

<style lang="less" scoped>
.app-container {
  margin: 20px;
  border-radius: 4px;
  :deep(.arco-col) {
    .arco-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      .arco-card-body {
        height: 0;
        flex: 1;
        overflow-y: auto;
      }
    }
  }
}
</style>
