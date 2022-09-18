<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useAppHook } from "@/hooks/app"

export default defineComponent({
  setup() {
    let { initSys } = useAppHook()
    initSys()
  }
})
</script>

<style>
@import "assets/css/iconfont.css";

.iconfont {
  font-size: unset;
  fill: currentcolor;
}
</style>
