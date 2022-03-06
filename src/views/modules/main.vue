<template>
  <div class="app-container">
    <div style="width: 100%; height: 500px; overflow: hidden">
      <chart :options="options"></chart>
    </div>
    学习vben的搜索 《span》第一行。左边（头像。 天气/祝福语日期） 右边 tip（比如，配置动态菜单，）
    <br />
    访问数，start 数， for数 card 访问量按月图 最后增加一个快捷导航
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <button @click="goHome">去home</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import HelloWorld from "@/components/HelloWorld.vue"
import router from "@/router"

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
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
    return { goHome, options }
  }
})
</script>

<style lang="less" scoped>
.app-container {
}
</style>
