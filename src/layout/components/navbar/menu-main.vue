<template>
  <div class="menu-main">
    <a-menu mode="horizontal" :default-selected-keys="['1']" :selected-keys="[nowFirstRouteKey]" @menu-item-click="clickMenu">
      <template v-for="route in routeList">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.key">
            <template #title>
<!--              <iconfont :class="route.icon"></iconfont>-->
<!--              {{route.title}}-->
              <div class="my-menu-item">
                <iconfont :class="route.icon"></iconfont>
                {{ route.title }}
              </div>
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
          <div class="my-menu-item">
            <iconfont :class="route.icon"></iconfont>
            {{ route.title }}
          </div>
        </a-menu-item>
      </template>
      </template>
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
import menuSub from "./menu-sub.vue"
export default defineComponent({
  components: {
    menuSub
  },
  setup () {
    let { routerMap, logOutEvent } = getUserHook()
    let { nowFirstRouteKey, updateNowFirstRouteKey, menuChoseKey, routeNavbarList:  routeList} = useAppHook()
    const route = useRoute()
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
      routeList,
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
      .arco-menu-item, .arco-menu-pop {
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
