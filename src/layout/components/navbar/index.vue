<template>
  <div class="app-navbar">
    <div class="left-wrapper">
      <img class="logo" src="/src/assets/images/common/logo-with-text.png" />
      <a-menu mode="horizontal" :default-selected-keys="['1']" :selected-keys="[nowFirstRouteKey]" @menu-item-click="clickMenu">
        <a-menu-item v-for="menu in routeList" :key="menu.key">
          <div class="my-menu-item">
            <iconfont :class="menu.icon"></iconfont>
            {{ menu.title }}
          </div>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="right-wrapper">
      <a-avatar>
        <img
          class="avatar"
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </a-avatar>
      <div class="username">admin</div>
      <a-dropdown @popup-visible-change="getDropDownState">
        <a-button type="primary" class="arco-btn-only-icon">
          <template #icon>
            <a-icon-down v-if="!dropDownState" />
            <a-icon-up v-else /> </template
        ></a-button>
        <template #content>
          <a-doption @click="logOutHand">登出</a-doption>
          <a-doption>Option 2</a-doption>
          <a-doption>Option 3</a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, unref, watchEffect } from "vue"
import { getUserHook } from '@/hooks/user'
import { useAppHook } from '@/hooks/app'
import {RouteType} from "@/constant/settings";
import router from "@/router";
import {fixRouteList, getFirstMenuItem, buildMenuName} from "@/utils/menu-help";
import ArcoModal from '@arco-design/web-vue/es/modal';

export default defineComponent({
  setup() {
    let { routeList, routerMap, logOutEvent } = getUserHook()
    let { nowFirstRouteKey, updateNowFirstRouteKey, menuChoseKey } = useAppHook()
    let dropDownState = ref(false)
    const clickMenu = function (key: string) {
      updateNowFirstRouteKey(key)
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
    const getDropDownState = function (status: boolean) {
      dropDownState.value = status
    }
    const logOutHand = function () {
      ArcoModal.warning({
        title: '确认登出',
        content: '是否确认登出？',
        cancelText: '取消',
        closable: true,
        hideCancel: false,
        onOk: () => {
          logOutEvent()
        }
      });
    }
    return {
      routeList,
      getDropDownState,
      dropDownState,
      nowFirstRouteKey,
      clickMenu,
      logOutHand
    }
  }
})
</script>

<style lang="less" scoped>
.app-navbar {
  display: flex;
  justify-content: space-between;
  .left-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    .logo {
      margin-left: 15px;
      width: 429px;
      height: 36px;
      margin-right: 30px;
    }
    :deep(.arco-menu) {
      background-color: @primary-color;
      .arco-menu-inner {
        overflow-y: hidden;
        padding: 0;
        .arco-menu-overflow-wrap {
          white-space: nowrap;
        }
        .arco-menu-item {
          padding: 0;
          height: @app-navbar-height;
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
      &.arco-menu-horizontal .arco-menu-item:not(:first-child),
      &.arco-menu-horizontal .arco-menu-pop:not(:first-child) {
        margin-left: 0;
      }
    }
  }
  .right-wrapper {
    display: flex;
    align-items: center;
    padding-right: 18px;
    .username {
      padding: 0 10px;
      font-size: 14px;
      color: #ffffff;
      line-height: 19px;
    }
    .avatar {
    }
  }
}
</style>
