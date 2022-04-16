<template>
  <div class="common-iframe">
    <iframe :src="iframePath"></iframe>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { Base64 } from "js-base64"

let route = useRoute()
let iframePath = Base64.decode(route.fullPath.split("-path-")[1])
console.log("iframPa", iframePath)
</script>

<style lang="less" scoped>
.common-iframe {
  width: 100%;
  height: 100%;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
