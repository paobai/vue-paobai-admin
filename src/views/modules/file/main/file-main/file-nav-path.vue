<template>
  <div class="file-nav-path">
    <a-input v-show="isShowInput" ref="inputRef" size="medium" placeholder="请输入路径" allow-clear @blur="onBlur" />

    <section v-show="!isShowInput" class="path" @click.self="onNavBar">
      <a-breadcrumb>
        <a-breadcrumb-item><span class="path-item">全部</span></a-breadcrumb-item>
        <a-breadcrumb-item><span class="path-item">文件夹1</span></a-breadcrumb-item>
        <a-breadcrumb-item><span class="path-item">分类</span></a-breadcrumb-item>
      </a-breadcrumb>
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue"

const isShowInput = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const onNavBar = () => {
  isShowInput.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const onBlur = () => {
  isShowInput.value = false
}
</script>

<style lang="less" scoped>
.file-nav-path {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  margin-bottom: 12px;
  // border-bottom: 1px dashed var(--color-border-3);
  :deep(.arco-input) {
    width: 100%;
  }

  .path {
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;
    cursor: pointer;
    border-radius: var(--border-radius-small);

    &:hover {
      background: var(--color-secondary-hover);
    }

    .path-item {
      transition: all 0.15s ease-in;

      &:hover {
        font-size: 1.1em;
        font-weight: bold;
        color: rgba(var(--primary-6));
      }
    }
  }
}
</style>
