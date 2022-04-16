<template>
  <div class="menu-main">
    <a-menu
      mode="horizontal"
      :default-selected-keys="['1']"
      :selected-keys="[nowFirstRouteKey]"
      @menu-item-click="clickMenu"
    >
      <template v-for="route in routeList">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.key" :class="{ 'arco-menu-selected': route.key === nowFirstRouteKey }">
            <template #icon>
              <iconfont class="left-iconfont" :class="route.icon"></iconfont>
            </template>
            <template #title>
              <div style="display: inline-block" @click="clickMenu(route.key)">
                {{ route.title }}
              </div>
            </template>
            <template #expand-icon-down>
              <a-icon-down class="right-suffix" />
            </template>
            <menu-sub v-for="routSub in route.children" :menuItem="routSub" :key="routSub.key"></menu-sub>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="route.key">
            <template #icon>
              <iconfont class="left-iconfont" :class="route.icon"></iconfont>
            </template>
            <span>{{ route.title }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useUserHook } from "@/hooks//user"
import { useAppHook } from "@/hooks/app"
import { RouteType } from "@/constant/settings"
import router from "@/router"
import { getFirstMenuItem } from "@/utils/menu-help"
import menuSub from "./menu-sub.vue"
export default defineComponent({
  components: {
    menuSub
  },
  setup() {
    let { getRouteByKey } = useUserHook()
    let { nowFirstRouteKey, routeNavbarList: routeList } = useAppHook()
    const clickMenu = function (key: string) {
      let dist = getRouteByKey(key)
      if (!dist) return
      if (dist.type === RouteType.Menu) {
        let find = getFirstMenuItem(dist.children)
        if (!find) return
        router.push({ name: find.routeName })
      } else {
        router.push({ name: dist.routeName })
      }
    }
    return {
      routeList,
      nowFirstRouteKey,
      clickMenu
    }
  }
})
</script>

<style lang="less" scoped>
.menu-main {
  height: 100%;
  flex: auto;
  :deep(.arco-menu) {
    height: 100%;
    background-color: @app-navbar-bk-color;
    .arco-menu-inner {
      overflow-y: hidden;
      padding: 0;
      .arco-menu-overflow-wrap {
        white-space: nowrap;
        height: 100%;
      }
      .arco-menu-item,
      .arco-menu-pop {
        padding: 0 30px;
        background-color: @app-navbar-bk-color;
        height: 100%;
        line-height: @app-navbar-height;
        border-radius: 0;
        color: var(--color-white);
        font-size: 18px;
        &:hover,
        &.arco-menu-selected {
          background: @app-navbar-bk-chose-color;
        }
        .arco-menu-title {
          padding-right: 20px;
          display: inline-block;
        }
        .arco-icon,
        .iconfont {
          font-size: 20px;
          color: var(--color-white);
        }
      }
    }
    &.arco-menu-horizontal .arco-menu-item:not(:first-child),
    &.arco-menu-horizontal .arco-menu-pop:not(:first-child) {
      margin-left: 0px;
    }
  }
}
</style>
