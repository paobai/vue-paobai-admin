<template>
  <div class="menu-main">
    <a-menu mode="horizontal" :default-selected-keys="['1']" :selected-keys="[nowFirstRouteKey]" @menu-item-click="clickMenu">
      <template v-for="route in routeList">
        <template v-if="route.children && route.children.length > 0">
          <a-sub-menu :key="route.key">
            <template #title>
              <div class="my-menu-item" @click="clickMenu(route.key)" :class="{'active': nowFirstRouteKey === route.key}">
                <iconfont class="left-iconfont" :class="route.icon"></iconfont>
                <div class="title-content">{{ route.title }}</div>
                <a-icon-down class="right-suffix"/>
              </div>
            </template>
            <template #expand-icon-down>
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
            <iconfont class="left-iconfont" :class="route.icon"></iconfont>
            <div class="title-content">{{ route.title }}</div>
          </div>
        </a-menu-item>
      </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, computed, reactive, onMounted, unref, watchEffect, watch} from "vue"
import {useUserHook} from "@/hooks//user";
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
    let { routerMap } = useUserHook()
    let { nowFirstRouteKey, routeNavbarList:  routeList} = useAppHook()
    const clickMenu = function (key: string) {
      let dist = routerMap.value[key]
      if (dist.type === RouteType.Page) {
        router.push({path: dist.path})
      } else {
        let find = getFirstMenuItem(dist.children)
        if (!find) return
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
    background-color: rgb(var(--arcoblue-6));
    .arco-menu-inner {
      overflow-y: hidden;
      padding: 0;
      .arco-menu-overflow-wrap {
        white-space: nowrap;
        height: 100%;
      }
      .arco-menu-item, .arco-menu-pop {
        background-color: rgb(var(--arcoblue-6));
        padding: 0;
        height: 100%;
        border-radius: 0;
        &:hover{
          background: rgb(var(--arcoblue-4));
        }
        .my-menu-item {
          text-align: left;
          height: 100%;
          min-width: 190px;
          max-width: 275px;
          color: #ffffff;
          font-size: 18px;
          padding: 20px 20px 20px 30px;
          transition: background 0.5s;
          display: flex;
          align-content: center;
          align-items: center;
          .left-iconfont {
            margin-right: 10px;
          }
          .right-suffix{
            margin-left: 10px;
            margin-right: 0;
            color: rgba(255, 255, 255, 0.7);
          }
          .title-content{
            flex: auto;
            text-align: center;
          }
          &.active{
            background: rgb(var(--arcoblue-4));
          }
        }
        &.arco-menu-selected {
          background: rgb(var(--arcoblue-4));
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
