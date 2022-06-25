<template>
  <span class="iconfont" v-bind="$attrs" @input="$emit('input', $event.target.value)">
    <slot> </slot>
  </span>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  emits: ["input"],
  setup: () => {
    return {}
  }
})
</script>
<style scoped></style>
