<template>
  <div class="app-navbar">
    <div class="left-wrapper">
      <img class="logo" src="/src/assets/images/common/logo-with-text.png" />
      <a-menu mode="horizontal" :default-selected-keys="['1']" :selected-keys="selectKey" @menu-item-click="clickMenu">
        <a-menu-item v-for="menu in routerList" :key="menu.key">
          <div class="my-menu-item">
            <iconfont class="icon-dangshui"></iconfont>
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
          <a-doption>Option 1</a-doption>
          <a-doption>Option 2</a-doption>
          <a-doption>Option 3</a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, unref, watchEffect } from "vue"
import { useUserStoreHook } from '@/store/modules/user'
import { useAppStoreHook } from '@/store/modules/app'
import {RouterApiType} from "@/constant/settings";

export default defineComponent({
  setup() {
    const userStore = useUserStoreHook()
    const appStore = useAppStoreHook()
    const routerList = computed((): RouterApiType[] => {
      return userStore.getPermissions
    })
    let selectKey = ref([''])
    let dropDownState = ref(false)
    const clickMenu = function (key: string) {
      selectKey.value = [key]
    }
    const getDropDownState = function (status: boolean) {
      dropDownState.value = status
    }
    watchEffect(() => appStore.updateNowFirstRouteKey(unref(selectKey)[0]))
    onMounted(() => {
      if (unref(routerList).length >0) selectKey.value = [unref(routerList)[0].key]
    });
    return { routerList, getDropDownState, dropDownState, selectKey, clickMenu }
  }
})
</script>

<style lang="scss" scoped>
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
      background-color: #06979c;
      .arco-menu-inner {
        overflow-y: hidden;
        padding: 0;
        .arco-menu-overflow-wrap {
          white-space: nowrap;
        }
        .arco-menu-item {
          padding: 0;
          height: $app-navbar-height;
          border-radius: 0;
          .my-menu-item {
            text-align: center;
            height: 100%;
            line-height: 18px;
            width: 190px;
            background: #06979c;
            color: #ffffff;
            font-size: 18px;
            padding: 20px 0;
            transition: background 0.5s;
            .iconfont {
              margin-right: 10px;
            }
            &:hover {
              background: #14c2c2;
            }
          }
          &.arco-menu-selected {
            .my-menu-item {
              background: #14c2c2;
            }
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
