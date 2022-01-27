<template>
  <router-view />
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue"
import {useAppHook} from "@/hooks/app";

export default defineComponent({
  setup() {
    let { updateSysColor } = useAppHook()
    onMounted(() => {
      updateSysColor()
    })
  }
})
</script>

<style>
@import url("assets/css/iconfont.css");
.iconfont {
  font-size: unset;
  fill: currentColor;
}
</style>
