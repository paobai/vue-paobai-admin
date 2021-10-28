<template>
  <div class="menu-wrapper">
    <a-menu
      :default-open-keys="['0']"
      :selected-keys="selectKey"
      @menu-item-click="clickMenu"
    >
      <template v-for="route in routeList">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu key="0">
            <template #title>
              <a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" />
              Navigation 1
            </template>
            <template #expand-icon-down>
              <a-icon-down :style="{ color: 'rgba(255, 255, 255, 0.7)' }" />
            </template>
            <menu-sub
              v-for="routSub in route.children"
              :route="routSub"
              :key="routSub.key"
            ></menu-sub>
          </a-sub-menu>
        </template>
        <template> </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue"
import menuSub from "./menu-sub.vue"
export default defineComponent({
  components: {
    menuSub
  },
  setup(props) {
    let selectKey = ref(["2_2_0"])
    let routeList = [
      { key: "1", title: "menu1" },
      {
        key: "2",
        title: "menu2",
        children: [
          { key: "2_1", title: "menu2_1" },
          { key: "2_2", title: "menu2_2" }
        ]
      },
      {
        key: "3",
        title: "menu3",
        children: [
          { key: "3_1", title: "menu3_1" },
          {
            key: "3_2",
            title: "menu3",
            children: [
              { key: "3_2_1", title: "menu3_1_1" },
              { key: "3_2_2", title: "menu3_1_2" }
            ]
          },
          { key: "3_3", title: "menu3_3" }
        ]
      }
    ]
    let clickMenu = (dist: string) => {
      console.log(dist)
      selectKey.value = [dist]
      console.log(selectKey)
    }
    return {
      clickMenu,
      selectKey,
      routeList
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
