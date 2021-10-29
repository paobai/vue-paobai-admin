<template>
  <div class="app-wrapper" :class="{'not-show-app-navbar': !showNavFlag}">
    <navbar></navbar>
    <div class="bottom-wrapper">
      <sidebar></sidebar>
      <app-main></app-main>
    </div>
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
import { useAppStoreHook } from "@/store/modules/app";
import { watchEffect, ref } from 'vue'
export default defineComponent({
  name: "Layout",
  components: {
    navbar,
    sidebar,
    appMain
  },
  setup() {
    const appStore = useAppStoreHook()
    let showNavFlag = ref(true)
    watchEffect(() => {
      showNavFlag.value = appStore.getNavbarShow
    })
    return {showNavFlag}
  }
})
</script>

<style lang="scss" scoped></style>
