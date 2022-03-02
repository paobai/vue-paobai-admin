<template>
  <div class="menu-wrapper">
    <a-menu
      showCollapseButton
      :selected-keys="[nowMenuKey]"
      :auto-open-selected="true"
      :open-keys="openKeys"
      @menu-item-click="clickMenu"
      @sub-menu-click="onClickSubMenu"
      v-model:collapsed="collapse"
    >
      <template v-for="route in routeList">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.key">
            <template #icon>
              <iconfont v-if="route.icon" :class="route.icon"></iconfont>
              <a-icon-apps v-else />
            </template>
            <template #title>
              {{ route.title }}
            </template>
            <template #expand-icon-down>
              <a-icon-down />
            </template>
            <menu-sub v-for="routSub in route.children" :menuItem="routSub" :key="routSub.key"></menu-sub>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="route.key">
            <template #icon>
              <iconfont v-if="route.icon" :class="route.icon"></iconfont>
              <a-icon-apps v-else />
            </template>
            {{ route.title }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, watchEffect } from "vue"
import menuSub from "./menu-sub.vue"
import { useAppHook } from "@/hooks/app"
import router from "@/router"
import { getFirstMenuItem } from "@/utils/menu-help"
import { buildRouteName } from "@/router/routerHelp"
export default defineComponent({
  components: {
    menuSub
  },
  setup() {
    let { routeSidebarList: routeList, getSideRouteByKey, collapse, nowMenu, nowMenuKey } = useAppHook()
    let clickMenu = function (key: string) {
      let dist = getSideRouteByKey(key)
      router.push({ name: buildRouteName(dist) })
    }
    let openKeys = ref([""])
    watchEffect(() => {
      if (!unref(nowMenu)) {
        openKeys.value = []
        return
      }
      openKeys.value = (unref(nowMenu).parentKey || []).concat(unref(nowMenu).key)
    })
    let onClickSubMenu = function (key: string, getOpenKeys: string[]) {
      openKeys.value = getOpenKeys
      // 折叠菜单模式点击直接选择第一个菜单
      if (unref(collapse)) {
        let dist = getSideRouteByKey(key)
        let find = getFirstMenuItem(dist.children)
        if (!find) return
        clickMenu(find.key)
      }
    }
    return {
      clickMenu,
      nowMenuKey,
      routeList,
      onClickSubMenu,
      collapse,
      openKeys
    }
  }
})
</script>

<style lang="less" scoped>
.menu-wrapper {
  :deep(.arco-menu) {
    background-color: @app-sidebar-bk-color;
    height: 100%;
    width: 100%;
    &.arco-menu-collapsed {
      .arco-menu-item,
      .arco-menu-pop {
        line-height: 80px;
      }
      .arco-icon,
      .iconfont {
        font-size: 60px !important;
        vertical-align: -10px;
      }
      &.arco-menu-vertical .arco-menu-pop-header,
      .arco-menu-item {
        padding-left: 9px;
      }
    }
    .arco-menu-inner {
      overflow: hidden;
      padding: 0;
    }
    .arco-menu-inline {
      .arco-menu-inline-header {
        margin-bottom: 0;
      }
    }
    .menu-item-common {
      background-color: @app-sidebar-bk-color;
      color: var(--color-white);
      line-height: 48px;
      border-right: 4px solid transparent;
      transition: background-color 0.5s, border-right-color 0.5s;
      &.arco-menu-selected,
      &:hover {
        background-color: @app-sidebar-bk-chose-color;
        border-right: 4px solid @app-sidebar-border-color;
      }
      .arco-icon,
      .iconfont {
        font-size: 18px;
        color: var(--color-white);
      }
    }
    .arco-menu-item,
    .arco-menu-pop {
      padding-right: 0;
      margin-bottom: 0;
      .menu-item-common();
    }
    .arco-menu-inline {
      .arco-menu-inline-header {
        .menu-item-common();
      }
    }
    .arco-menu-collapse-button {
      right: -10px;
      bottom: 12px;
      font-size: 20px;
      overflow: hidden;
      z-index: 1000;
    }
    &:before {
      z-index: 1000;
      overflow: hidden;
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 48px;
      height: 48px;
      background-color: inherit;
      border-radius: 50%;
      box-shadow: 4px 0 2px #0000004d, 0 0 1px #0000004d;
      transform: translate(50%);
    }
    &:not(.arco-menu-collapsed):before {
      box-shadow: -4px 0 2px #0000004d, 0 0 1px #0000004d;
    }
  }
}
</style>
