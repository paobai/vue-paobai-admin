<template>
  <span
    class="iconfont"
    v-bind="$attrs"
    v-on:input="$emit('input', $event.target.value)">
    <slot>
    </slot>
  </span>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
export default defineComponent({
  setup: () => {
    return { }
  }
})
</script>
<style scoped>
</style>
