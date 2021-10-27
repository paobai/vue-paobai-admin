<template>
  <div class="app-container">
    123123
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <button @click="goHome">去home</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"
import HelloWorld from "@/components/HelloWorld.vue"
// import { useStore } from '@/store'
import router from "@/router"
export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  },
  setup() {
    // let store = useStore()
    let goHome = function () {
      router.push({ name: "home" })
    }
    return { goHome }
  }
})
</script>
