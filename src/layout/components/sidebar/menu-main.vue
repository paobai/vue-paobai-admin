<template>
  <div class="menu-wrapper">
    <a-menu
      showCollapseButton
      theme="dark"
      :selected-keys="[menuChoseKey]"
      :open-keys="openKeys"
      @menu-item-click="clickMenu"
      @sub-menu-click="onClickSubMenu"
      v-model:collapsed="collapse"
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
import {useRoute} from "vue-router";
import {getFirstMenuItem} from "@/utils/menu-help";
export default defineComponent({
  components: {
    menuSub
  },
  setup(props) {
    let {
      routeSidebarList: routeList,
      getMenuByKey,
      nowFirstRouteKey,
      collapse,
      updateCollapse
    } = useAppHook()
    let openKeys = ref([''])
    const route = useRoute()
    let clickMenu = function (key: string) {
      let dist = getMenuByKey(key)
      router.push({name: dist.title + '-' + dist.key})
    }
    let menuChoseKey = ref('')
    watchEffect(() => {
      menuChoseKey.value = route.meta.key as string
    })
    watchEffect(() => {
      let key = menuChoseKey.value
      let dist = getMenuByKey(key)
      if (!dist) return
      openKeys.value = dist.parentKey.concat(key)
    })
    let onClickSubMenu = function (key: string, getOpenKeys: string[], keyPath: string[]) {
      if (unref(collapse)) {
        let dist = getMenuByKey(key)
        let find = getFirstMenuItem(dist.children)
        if (!find) return
        clickMenu(find.key)
      }
      openKeys.value = getOpenKeys
    }
    return {
      clickMenu,
      menuChoseKey,
      routeList,
      openKeys,
      onClickSubMenu,
      collapse,
      updateCollapse
    }
  }
})
</script>

<style lang="less" scoped>
.menu-wrapper {
  color: #ffffff;
  display: flex;
  flex-direction: column;
  :deep(.arco-menu) {
    height: 0;
    flex: 1;
    width: 100%;
    &.arco-menu-collapsed{
      font-size: 60px;
      .arco-menu-item, .arco-menu-pop{
        line-height: 80px;
      }
      .arco-icon{
        vertical-align: -10px;
      }
      &.arco-menu-vertical .arco-menu-pop-header, .arco-menu-item{
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
    .arco-menu-item, .arco-menu-pop {
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
    .arco-menu-collapse-button{
      right: -10px;
      bottom: 12px;
      font-size: 20px;
    }
    &:before{
      overflow: hidden;
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 48px;
      height: 48px;
      background-color: inherit;
      border-radius: 50%;
      box-shadow: 4px 0 2px #0000004d,0 0 1px #0000004d;
      transform: translate(50%);
    }
    &:not(.arco-menu-collapsed):before{
      box-shadow: -4px 0 2px #0000004d,0 0 1px #0000004d;
    }
  }
}
</style>
