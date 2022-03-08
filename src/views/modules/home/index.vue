<template>
  <div class="app-container">
    <a-space direction="vertical" :size="12" fill>
      <a-row :gutter="[16, 16]" justify="start">
        <a-col :span="8" style="height: 350px">
          <welcome></welcome>
        </a-col>
        <a-col :span="16" style="height: 350px">
          <tip></tip>
        </a-col>
        <a-col :xs="24" :md="12" :xl="8">
          <a-card class="first-card" title="start">
            <a-row align="center"></a-row>
          </a-card>
        </a-col>
        <a-col :xs="24" :md="12" :xl="8">
          <a-card class="first-card" title="fork数">
            <a-row align="center"></a-row>
          </a-card>
        </a-col>
        <a-col :xs="24" :md="24" :xl="8">
          <a-card class="first-card" title="合并图">
            <a-row align="center"></a-row>
          </a-card>
        </a-col>
        <a-col>
          <a-row :gutter="16">
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
      <a-space direction="vertical" :size="12" fill>
        <div style="width: 100%; height: 500px; overflow: hidden">
          <chart :options="options"></chart>
        </div>
        学习vben的搜索 《span》第一行。左边（头像。 天气/祝福语日期） 右边 tip（比如，配置动态菜单，）
        <br />
        访问数，start 数， for数 card 访问量按月图 最后增加一个快捷导航
        <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
        <button @click="goHome">去home</button>
      </a-space>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, readonly } from "vue"
import HelloWorld from "@/components/HelloWorld.vue"
import router from "@/router"

import welcome from "./components/welcome.vue"
import tip from "./components/tip.vue"

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    welcome,
    tip
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
    height: 400px;
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
