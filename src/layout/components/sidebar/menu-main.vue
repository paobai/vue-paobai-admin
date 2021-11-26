<template>
  <div class="menu-wrapper">
    <a-menu
      theme="dark"
      :selected-keys="[menuChoseKey]"
      :open-keys="openKeys"
      @menu-item-click="clickMenu"
      @sub-menu-click="onClickSubMenu"
    >
      <template v-for="route in routeList">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.key">
            <template #title>
              <a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" />
              {{route.title}}
            </template>
            <template #expand-icon-down>
              <a-icon-down :style="{ color: 'rgba(255, 255, 255, 0.7)' }" />
            </template>
            <menu-sub
              v-for="(routSub, index) in route.children"
              :menuItem="routSub"
              :key="routSub.key"
            ></menu-sub>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="route.key">
            <a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" />
            {{route.title}}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, unref, onMounted, watchEffect } from "vue"
import menuSub from "./menu-sub.vue"
import { useAppHook } from '@/hooks/app'
import { getUserHook } from '@/hooks/user'
import router from "@/router";
import {RouterApiType} from "@/constant/settings";
export default defineComponent({
  components: {
    menuSub
  },
  setup(props) {
    let {menuChoseKey, routeSidebarList: routeList, changeSideChose, getMenuByKey, nowFirstRouteKey } = useAppHook()
    let { routerMap } = getUserHook()
    let openKeys = ref([''])
    let clickMenu = function (key: string) {
      let dist = getMenuByKey(key)
      if (!dist) return
      changeSideChose(key)
      router.push({name: dist.title + '-' + dist.key})
    }
    watchEffect(() => {
      let key = menuChoseKey.value
      let dist = getMenuByKey(key)
      if (!dist) return
      openKeys.value = dist.parentKey.concat(key)
    })
    let onClickSubMenu = function (key: string, getOpenKeys: string[], keyPath: string[]) {
      openKeys.value = getOpenKeys
    }
    return {
      clickMenu,
      menuChoseKey,
      routeList,
      openKeys,
      onClickSubMenu
    }
  }
})
</script>

<style lang="less" scoped>
.menu-wrapper {
  color: #ffffff;
  :deep(.arco-menu) {
    width: 100%;
    .arco-menu-inner {
      padding: 0;
    }
    .arco-menu-inline {
      .arco-menu-inline-header {
        margin-bottom: 0;
      }
    }
    .arco-menu-item {
      padding-right: 0;
      color: #ffffff;
      margin-bottom: 0;
      line-height: 48px;
      border-left: 4px solid transparent;
      transition: background-color  0.5s,border-left-color 0.5s;
      &.arco-menu-selected, &:hover {
        border-left: 4px solid #ffffff;
      }
    }
    .arco-menu-inline {
      .arco-menu-inline-header {
        color: #ffffff;
        border-left: 4px solid transparent;
        line-height: 48px;
        transition: background-color  0.5s, border-left-color 0.5s;
        &.arco-menu-selected:hover,
        &.arco-menu-selected, &:hover {
          border-left: 4px solid #ffffff;
        }
      }
    }
  }
}
</style>
