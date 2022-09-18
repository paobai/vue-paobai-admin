<template>
  <span
    class="iconfont"
    :style="{ fontSize: size ? size + 'px' : '' }"
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)">
    <slot> </slot>
  </span>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    size: {
      type: [Number, String],
      default: undefined
    }
  },
  emits: ["input"],
  setup: () => {
    return {}
  }
})
</script>
<style scoped></style>
