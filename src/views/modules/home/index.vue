<template>
  <div class="app-container">
    <a-space direction="vertical" :size="12" fill>
      <a-row :gutter="[16, 16]" justify="start">
        <a-col :xs="24" :md="24" :xl="14" class="first-line">
          <tip></tip>
        </a-col>
        <a-col :xs="24" :md="24" :xl="10" class="first-line">
          <welcome></welcome>
        </a-col>
        <a-col :xs="24" :md="12" :xl="8" class="second-line">
          <star-chart></star-chart>
        </a-col>
        <a-col :xs="24" :md="12" :xl="8" class="second-line">
          <view-chart></view-chart>
        </a-col>
        <a-col :xs="24" :md="24" :xl="8" class="second-line">
          <comp-chart></comp-chart>
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
    &.first-line {
      height: 390px;
    }
    &.second-line {
      height: 430px;
    }
    .arco-spin {
      height: 100%;
      width: 100%;
    }
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
