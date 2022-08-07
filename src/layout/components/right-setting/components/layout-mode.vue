<template>
  <div class="layout-mode">
    <a-tooltip v-for="item in layoutModeList" :key="item.value" :content="item.details" position="lt">
      <div
        class="chose-item"
        :class="[`mode-${item.value}`, { active: item.value === layoutMode }]"
        @click="layoutMode = item.value"></div>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { layoutModeList } from "@/constant"
import { useAppHook } from "@/hooks/app"
export default {
  name: "LayoutMode",
  setup() {
    const { layoutMode } = useAppHook()
    return {
      layoutModeList,
      layoutMode
    }
  }
}
</script>

<style scoped lang="less">
.layout-mode {
  display: flex;
  justify-content: space-between;
  .chose-item {
    background: var(--color-fill-2);
    border-radius: 4px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    box-shadow: 0 1px 2.5px #0000002e;
    position: relative;
    overflow: hidden;
    & + .chose-item {
      margin-left: 16px;
    }
    &.active {
      border: 2px solid @primary-color;
    }
    &::before,
    &::after {
      color: #ffffff;
      position: absolute;
      content: "";
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.mode-1 {
      &:before {
        content: "M";
        top: 0;
        left: 0;
        z-index: 1;
        width: 33%;
        height: 100%;
        background-color: @primary-color;
      }
      &:after {
        content: "M";
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: @primary-color;
      }
    }
    &.mode-2 {
      &:after {
        content: "M";
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: @primary-color;
      }
    }
    &.mode-3 {
      &:before {
        content: "M";
        top: 0;
        left: 0;
        z-index: 1;
        width: 33%;
        height: 100%;
        background-color: @primary-color;
      }
    }
    &.mode-4 {
      &:before {
        content: "M";
        top: 0;
        left: 0;
        z-index: 1;
        width: 33%;
        height: 100%;
        background-color: @primary-color;
      }
      &:after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: @primary-color;
      }
    }
  }
}
</style>
