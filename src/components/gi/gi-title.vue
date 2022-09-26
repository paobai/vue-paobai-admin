<template>
  <div class="gi-title" :class="{ 'is-fill': fill, shadow: shadow }">
    <a-row justify="space-between" align="center" class="wrapper" :style="{ 'border-bottom-style': borderType }">
      <h3 class="title">{{ props.title }}</h3>
      <a-space>
        <slot></slot>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts" name="GiTitle">
import type { PropType } from "vue"

const props = defineProps({
  // 标题
  title: {
    type: String as PropType<string>,
    default: ""
  },
  // 边框样式
  borderType: {
    type: String as PropType<string>,
    default: "dashed"
  },
  // 是否撑满
  fill: {
    type: Boolean,
    default: false
  },
  // 是否显示阴影
  shadow: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.gi-title {
  z-index: 99;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 44px;
  padding: 0 16px;

  > .wrapper {
    box-sizing: border-box;
    height: 100%;
    border-bottom-color: var(--color-neutral-3);
    border-bottom-width: 1px;
  }

  &.is-fill {
    padding: 0;

    > .wrapper {
      padding: 0 16px;
    }
  }

  &.shadow {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 8%);

    > .wrapper {
      border: 0;
    }
  }

  .title {
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: 16px;
    font-weight: normal;
    color: var(--color-text-1);
  }
}
</style>
