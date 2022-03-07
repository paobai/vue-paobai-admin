<template>
  <div class="app-container">
    <a-space direction="vertical" :size="12" fill>
      <a-row class="top-wrapper" :gutter="[16, 16]" justify="start">
        <a-col :span="16">
          <a-card class="first-card" :title="'欢迎回来！' + userInfo.realName">
            <a-row align="center">
              <a-col flex="100px">
                <a-avatar>
                  <img alt="avatar" :src="userInfo.avatar" />
                </a-avatar>
              </a-col>
              <a-col flex="auto">
                <a-typography-title :heading="5" style="margin-top: 0"> {{ userInfo.realName }} </a-typography-title>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="first-card" title="TIP/技术栈">
            <a-row align="center"> </a-row>
          </a-card>
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
import { computed, defineComponent } from "vue"
import HelloWorld from "@/components/HelloWorld.vue"
import router from "@/router"
import { useUserStoreWithOut } from "@/store/modules/user"

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
    const userStore = useUserStoreWithOut()
    const userInfo = computed(() => {
      return userStore.getUserInfo
    })
    return { goHome, options, userInfo }
  }
})
</script>

<style lang="less" scoped>
.app-container {
  margin: 20px;
  border-radius: 4px;
  .top-wrapper {
    .first-card {
      height: 400px;
    }
  }
}
</style>
