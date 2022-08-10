<template>
  <div class="app-main">
    <div class="app-main-container">
      <router-view>
        <template #default="{ Component, route }">
          <transition mode="out-in" appear name="fade">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({})
</script>

<style lang="less" scoped>
.app-main {
  width: 100%;
  height: 100%;

  .app-main-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
