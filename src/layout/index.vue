<template>
  <div class="app-wrapper">
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
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs
} from "vue"
export default defineComponent({
  name: "Layout",
  components: {
  },
  setup() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
