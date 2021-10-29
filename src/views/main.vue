<template>
  <div class="app-container">
    123123
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <button @click="goHome">去home</button>
    <button @click="changeSide">切换</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"
import HelloWorld from "@/components/HelloWorld.vue"
import { useAppStoreHook } from "@/store/modules/app";
// import { useStore } from '@/store'
import router from "@/router"
export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  },
  setup() {
    let appStore = useAppStoreHook()
    let changeSide = function (){
      appStore.updateNavBarShow(!appStore.navBarShow)
    }
    let goHome = function () {
      router.push({ name: "home" })
    }
    return { goHome, changeSide }
  }
})
</script>
