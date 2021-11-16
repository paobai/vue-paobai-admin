<template>
  <div class="app-wrapper" :class="{'not-show-app-navbar': !showNavFlag, 'not-show-sidebar': !showSideBar }">
    <navbar></navbar>
    <div class="bottom-wrapper">
      <sidebar></sidebar>
      <app-main></app-main>
    </div>
    <right-setting></right-setting>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs
} from "vue"
import navbar from "./components/navbar/index.vue"
import sidebar from "./components/sidebar/index.vue"
import appMain from "./components/app-main/index.vue"
import rightSetting from './components/right-setting/index.vue'
import { useAppStoreHook } from "@/store/modules/app";
import { watchEffect, ref } from 'vue'
import { useAppHook } from '@/hooks/app'
export default defineComponent({
  name: "Layout",
  components: {
    navbar,
    sidebar,
    appMain,
    rightSetting
  },
  setup() {
    let { navbarShow: showNavFlag, showSideBar, initRouterMenuChose } = useAppHook()
    initRouterMenuChose()
    return {showNavFlag, showSideBar}
  }
})
</script>

<style lang="less" scoped>
</style>
