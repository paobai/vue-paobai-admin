<template>
  <div class="app-navbar">
    <div class="left-wrapper">
      <div class="logo-wrapper">
        <img class="logo" src="/src/assets/images/common/logo-with-text-small.png" />
      </div>
      <menu-main></menu-main>
    </div>
    <div class="right-wrapper">
      <a-avatar>
        <img
          class="avatar"
          alt="avatar"
          :src="userInfo.avatar"
        />
      </a-avatar>
      <div class="username">{{userInfo.username}}</div>
      <a-dropdown @popup-visible-change="getDropDownState" @select="tagSelect">
        <a-button type="primary" class="arco-btn-only-icon">
          <template #icon>
            <a-icon-down v-if="!dropDownState" />
            <a-icon-up v-else /> </template
        ></a-button>
        <template #content>
          <a-doption value="logout">登出</a-doption>
          <a-doption>Option 2</a-doption>
          <a-doption>Option 3</a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, unref, watchEffect } from "vue"
import { useUserHook } from '@/hooks/user'
import ArcoModal from '@arco-design/web-vue/es/modal';
import menuMain from './menu-main.vue'
export default defineComponent({
  components: {
    menuMain
  },
  setup() {
    let { logOutEvent, userInfo } = useUserHook()
    let dropDownState = ref(false)
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
    const tagSelect = function (tagValue: string) {
      if (tagValue === 'logout') {
        logOutHand()
      }
    }
    return {
      getDropDownState,
      dropDownState,
      tagSelect,
      userInfo
    }
  }
})
</script>

<style lang="less" scoped>
.app-navbar {
  display: flex;
  justify-content: space-between;
  .left-wrapper {
    flex: auto;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    .logo-wrapper{
      width: 215px;
      text-align: center;
      .logo {
        width: 130px;
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
