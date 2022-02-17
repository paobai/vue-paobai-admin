<template>
  <div class="app-container">
    <chart width="100%" height="500px" :options="options"></chart>
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
import { Message } from '@arco-design/web-vue'

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  },
  setup() {
    Message.info('1231')
    let goHome = function () {
      router.push({ name: "home" })
    }
    let options = {
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
    return { goHome, options }
  }
})
</script>

<style lang="scss" scoped>
.app-container{

}
</style>
