<template>
  <div class="menu-main">
    <a-menu mode="horizontal" :default-selected-keys="['1']" :selected-keys="[nowFirstRouteKey]" @menu-item-click="clickMenu">
      <a-menu-item v-for="menu in showRouteList" :key="menu.key">
        <div class="my-menu-item">
          <iconfont :class="menu.icon"></iconfont>
          {{ menu.title }}
        </div>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, reactive, onMounted, unref, watchEffect, watch} from "vue"
import {getUserHook} from "@/hooks//user";
import {useAppHook} from "@/hooks/app";
import {RouteType} from "@/constant/settings";
import router from "@/router";
import {getFirstMenuItem, getCanShowRoute} from "@/utils/menu-help";
import {useRoute} from "vue-router";
export default defineComponent({
  setup () {
    let { routeList, routerMap, logOutEvent } = getUserHook()
    let { nowFirstRouteKey, updateNowFirstRouteKey, menuChoseKey } = useAppHook()
    const route = useRoute()
    const showRouteList = computed(() => {
      return getCanShowRoute(unref(routeList))
    })
    watch(() => route.path,() => {
      let currentRouteKey: string = route.meta.key as string
      if (!currentRouteKey) return
      let dist = routerMap.value[currentRouteKey]
      if (dist.notShow) return;
      if ( !dist.parentKey || !dist.parentKey[0] ) {
        updateNowFirstRouteKey(currentRouteKey)
      } else {
        updateNowFirstRouteKey(dist.parentKey[0])
      }
    }, { immediate: true })
    const clickMenu = function (key: string) {
      let dist = routerMap.value[key]
      if (dist.type === RouteType.Page) {
        router.push({path: dist.path})
      } else {
        let find = getFirstMenuItem(dist.children)
        if (!find) return
        menuChoseKey.value = find.key
        router.push({path: find.path})
      }
    }
    return {
      showRouteList,
      nowFirstRouteKey,
      clickMenu
    }
  }
})
</script>

<style lang="less" scoped>
.menu-main{
  height: 100%;
  flex: auto;
  :deep(.arco-menu) {
    height: 100%;
    background-color: @primary-color;
    .arco-menu-inner {
      overflow-y: hidden;
      padding: 0;
      .arco-menu-overflow-wrap {
        white-space: nowrap;
        height: 100%;
      }
      .arco-menu-item {
        padding: 0;
        height: 100%;
        border-radius: 0;
        .my-menu-item {
          text-align: center;
          height: 100%;
          line-height: 18px;
          width: 190px;
          color: #ffffff;
          font-size: 18px;
          padding: 20px 0;
          transition: background 0.5s;
          .iconfont {
            margin-right: 10px;
          }
        }
        &.arco-menu-selected {
          background: @primary-hover;
        }
      }
    }
    &.arco-menu-horizontal .arco-menu-item:not(:first-child)
    ,&.arco-menu-horizontal .arco-menu-pop:not(:first-child)
    {
      margin-left: 0px;
    }
  }
}
</style>
