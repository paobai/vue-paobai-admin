<template>
  <div class="wait-dev">
    <div style="text-align: center">
      路径错误或等待开发,当前页面为:
      <div>{{ title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
let route = useRoute()
let title = route.meta.title
</script>

<style lang="less" scoped>
.wait-dev {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
}
</style>
