<template>
  <div class="app-container">
    <div style="width: 100%;height:500px;overflow: hidden">
      <chart :options="options"></chart>
    </div>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <button @click="goHome">去home</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import HelloWorld from "@/components/HelloWorld.vue"
import router from "@/router"
import { Message } from "@arco-design/web-vue"

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

<style lang="scss" scoped>
.app-container {
}
</style>
