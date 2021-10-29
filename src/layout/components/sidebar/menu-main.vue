<template>
  <div class="menu-wrapper">
    <a-menu
      :default-open-keys="selectKey"
      :selected-keys="selectKey"
      @menu-item-click="clickMenu"
    >
      <template v-for="route in routeList">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.key">
            <template #title>
              <a-icon-apps :style="{ color: 'rgba(255, 255, 255, 0.4)' }" />
              {{route.title}}i
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
import { defineComponent, ref, reactive, computed, watch, unref } from "vue"
import menuSub from "./menu-sub.vue"
import { fixRouteList, getFirstMenuItem } from './menu-help'
import { useAppStoreHook } from "@/store/modules/app";
import { useUserStoreHook } from "@/store/modules/user";
import {RouterApiType} from "@/constant/settings";
export default defineComponent({
  components: {
    menuSub
  },
  setup(props) {
    const appStore = useAppStoreHook()
    const userStore = useUserStoreHook()
    let selectKey = ref([])
    let routeList = ref([] as RouterApiType[])
    let routeFixMap: { [key: string]: any } = {}
    watch([() => appStore.getNowFirstRouteKey,() => appStore.getNavbarShow], ([nowKey, navBarShow]) => {
      let dist: RouterApiType[] = []
      if (navBarShow) {
        let parentDist = userStore.getPermissions.filter(item => item.key === unref(nowKey))[0]
        if (parentDist) dist = parentDist.children || []
      } else {
        dist = userStore.getPermissions
      }
      routeList.value = dist || []
      routeFixMap = {}
      let routeFixArray = fixRouteList(unref(routeList))
      routeFixArray.forEach(item => {
        routeFixMap[item.key] = item
      })
      let findFirstMenu = getFirstMenuItem(unref(routeList))
      if (findFirstMenu) selectKey.value = routeFixMap[findFirstMenu.key].parentKey.concat(findFirstMenu.key)
    }, {immediate: true})
    let clickMenu = (key: string) => {
      let dist = routeFixMap[key].parentKey
      selectKey.value = dist.concat(key)
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
