<template>
  <div class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition
            mode="out-in"
            appear
        >
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({})
</script>
