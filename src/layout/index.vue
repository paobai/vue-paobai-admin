<template>
  <div
    class="app-wrapper"
    :class="{
      'not-show-app-navbar': !navbarShow,
      'not-show-sidebar': !fixSidebarShow
    }"
  >
    <navbar></navbar>
    <div class="bottom-wrapper">
      <div class="bottom-left-wrapper">
        <sidebar></sidebar>
      </div>
      <div class="bottom-right-wrapper">
        <app-tag></app-tag>
        <app-main></app-main>
        <app-footer v-if="footerShow"></app-footer>
      </div>
    </div>
    <right-setting></right-setting>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import navbar from "./components/navbar/index.vue"
import sidebar from "./components/sidebar/index.vue"
import appMain from "./components/app-main/index.vue"
import rightSetting from "./components/right-setting/index.vue"
import appTag from "./components/tag/index.vue"
import { useAppHook } from "@/hooks/app"
import appFooter from "./components/app-footer/index.vue"
export default defineComponent({
  name: "Layout",
  components: {
    navbar,
    sidebar,
    appMain,
    rightSetting,
    appTag,
    appFooter
  },
  setup() {
    let { navbarShow, fixSidebarShow, footerShow } = useAppHook()
    return { navbarShow, fixSidebarShow, footerShow }
  }
})
</script>

<style lang="less" scoped></style>
