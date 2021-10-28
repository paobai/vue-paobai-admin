<template>
  <div class="menu-wrapper">
    <a-menu
      :default-open-keys="['0']"
      :selected-keys="selectKey"
      @menu-item-click="clickMenu"
    >
      <a-menu-item key="8_0"
        ><a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" /> Menu
        8</a-menu-item
      >
      <a-sub-menu key="0">
        <template #title
          ><a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" />
          Navigation 1</template
        >
        <template #expand-icon-down
          ><a-icon-down :style="{ color: 'rgba(255, 255, 255, 0.7)' }"
        /></template>
        <a-menu-item key="0_0">Menu 1</a-menu-item>
        <a-menu-item key="0_1">Menu 2</a-menu-item>
        <a-menu-item key="0_2">Menu 3</a-menu-item>
        <a-menu-item key="0_3">Menu 4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #title
          ><a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" />
          Navigation 2</template
        >
        <template #expand-icon-down
          ><a-icon-down :style="{ color: 'rgba(255, 255, 255, 0.7)' }"
        /></template>
        <a-menu-item key="1_0">Menu 1</a-menu-item>
        <a-menu-item key="1_1">Menu 2</a-menu-item>
        <a-menu-item key="1_2">Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #title
          ><a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" />
          Navigation 3</template
        >
        <template #expand-icon-down
          ><a-icon-down :style="{ color: 'rgba(255, 255, 255, 0.7)' }"
        /></template>
        <a-menu-item key="2_0">Menu 1</a-menu-item>
        <a-menu-item key="2_1">Menu 2</a-menu-item>
        <a-sub-menu key="2_2" title="Navigation 4">
          <a-menu-item key="2_2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_2_1">Menu 2</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue"
export default defineComponent({
  setup(props) {
    let selectKey = ref(["2_2_0"])
    let clickMenu = dist => {
      console.log(dist)
      selectKey.value = [dist]
      console.log(selectKey)
    }
    return {
      clickMenu,
      selectKey
    }
  }
})
</script>

<style lang="scss" scoped>
.menu-wrapper {
  color: #ffffff;
  :deep(.arco-menu) {
    width: 100%;
    background: transparent;
    .arco-menu-inner {
      padding: 0;
    }
    .arco-menu-inline {
      .arco-menu-inline-header {
        background: transparent;
        margin-bottom: 0;
      }
    }
    .arco-menu-item {
      padding-right: 0;
      background: transparent;
      color: #ffffff;
      margin-bottom: 0;
      line-height: 48px;
      border-right: 4px solid transparent;
      transition: background, border-right-color 0.2s;
      &.arco-menu-selected,
      &:hover {
        background: #222735;
      }
      &.arco-menu-selected {
        border-right: 4px solid #06979c;
      }
    }
    .arco-menu-inline {
      .arco-menu-inline-header {
        color: #ffffff;
        border-right: 4px solid transparent;
        line-height: 48px;
        transition: background, border-right-color 0.2s;
        &.arco-menu-selected:hover,
        &.arco-menu-selected {
          background: #222735;
        }
        &.arco-menu-selected {
          border-right: 4px solid #06979c;
        }
      }
    }
  }
}
</style>
