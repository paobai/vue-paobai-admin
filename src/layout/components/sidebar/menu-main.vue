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
            <template #title>
              <a-icon-apps />
              {{route.title}}
            </template>
            <template #expand-icon-down>
              <a-icon-down  />
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
            <template #icon>
              <iconfont v-if="route.icon" :class="route.icon"></iconfont>
              <a-icon-apps  v-else />
            </template>
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
import { useUserHook } from '@/hooks/user'
import router from "@/router";
import {RouterApiType} from "@/constant/settings";
import {useRoute} from "vue-router";
import {getFirstMenuItem} from "@/utils/menu-help";
import {buildRouteName} from "@/router/routerHelp";
export default defineComponent({
  components: {
    menuSub
  },
  setup(props) {
    let {
      routeSidebarList: routeList,
      getMenuByKey,
      collapse,
      nowMenu,
      nowMenuKey
    } = useAppHook()
    let clickMenu = function (key: string) {
      let dist = getMenuByKey(key)
      router.push({name: buildRouteName(dist)})
    }
    let openKeys = ref([''])
    watchEffect(() => {
      if (!unref(nowMenu)) {
        openKeys.value = []
        return
      }
      openKeys.value = (unref(nowMenu).parentKey || []).concat(unref(nowMenu).key)
    })
    let onClickSubMenu = function (key: string, getOpenKeys: string[], keyPath: string[]) {
      openKeys.value = getOpenKeys
      // 折叠菜单模式点击直接选择第一个菜单
      if (unref(collapse)) {
        let dist = getMenuByKey(key)
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
    background-color: rgb(var(--arcoblue-6));
    height: 100%;
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
      background-color: rgb(var(--arcoblue-6));
      padding-right: 0;
      color: var(--color-white);
      margin-bottom: 0;
      line-height: 48px;
      border-left: 4px solid transparent;
      transition: background-color  0.5s,border-left-color 0.5s;
      &.arco-menu-selected, &:hover {
        background-color: rgb(var(--arcoblue-4));
        border-left: 4px solid rgb(var(--arcoblue-9));
      }
      .arco-icon, .iconfont{
        color: var(--color-white);
      }
    }
    .arco-menu-inline {
      .arco-menu-inline-header {
        background-color: rgb(var(--arcoblue-6));
        color: var(--color-white);
        border-left: 4px solid transparent;
        line-height: 48px;
        transition: background-color  0.5s, border-left-color 0.5s;
        &.arco-menu-selected:hover,
        &.arco-menu-selected, &:hover {
          background-color: rgb(var(--arcoblue-4));
          border-left: 4px solid rgb(var(--arcoblue-9));
        }
      }
      .arco-icon{
        color: var(--color-white);
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
