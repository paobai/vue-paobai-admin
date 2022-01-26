<template>
  <div class="app-container">
    <div ref="chartRef" style="width: 500px;height: 500px">

    </div>
    123123
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <button @click="goHome">去home</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, unref } from "vue"
import type { Ref } from 'vue'
import HelloWorld from "@/components/HelloWorld.vue"
import router from "@/router"
import { useECharts } from "@/utils/echarts";
import type { EChartsOption } from 'echarts';

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  },
  setup() {
    let goHome = function () {
      router.push({ name: "home" })
    }
    const chartRef = ref<HTMLDivElement | null>( null);
    let options: EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
    let { setOption } = useECharts(chartRef as Ref<HTMLDivElement>)
    setOption(options)
    return { goHome, chartRef }
  }
})
</script>

<style lang="scss" scoped>
.app-container{

}
</style>
