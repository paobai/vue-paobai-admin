<template>
  <div class="app-navbar">
    <div class="left-wrapper">
      <img class="logo" src="/src/assets/images/common/logo-with-text.png" />
      <a-menu mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item v-for="menu in routerList" :key="menu.key">
          <div class="my-menu-item">
            <iconfont class="icon-dangshui"></iconfont>
            {{ menu.name }}
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
import { defineComponent, ref } from "vue"
export default defineComponent({
  setup() {
    let routerList = [
      { key: "1", name: "总体概况", icon: "" },
      { key: "2", name: "作战指挥", icon: "" },
      { key: "3", name: "智慧治水", icon: "" },
      { key: "4", name: "数据管理", icon: "" },
      { key: "5", name: "系统管理", icon: "" }
    ]
    let dropDownState = ref(false)
    const getDropDownState = function (status) {
      console.log(dropDownState)
      dropDownState.value = status
    }
    return { routerList, getDropDownState, dropDownState }
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
