<template>
  <div class="right-setting-button">
    <a-button type="primary" shape="circle" @click="updateRightSetting(true)">
      <a-icon-settings :style="{color:'#ffffff', fontSize: '30pX'}"  />
    </a-button>
  </div>
  <a-drawer :visible="showRightSetting"  unmountOnClose  @cancel="updateRightSetting(false)" :closable="false" cancel-text="关闭" :width="300">
    <template #title>
      全局设置
    </template>
    <template #footer>
      <a-button @click="updateRightSetting(false)" type="primary" >关闭</a-button>
    </template>
    <div class="right-setting-wrapper">
      <div class="item-setting-line">
        显示顶部：
        <a-switch :disabled="!sidebarShow" :default-checked="navbarShow" @change="updateNavbar">
          <template #checked>显示</template>
          <template #unchecked>不显示</template>
        </a-switch>
      </div>
      <div class="item-setting-line" >
        显示左部(未实现)：
        <a-switch :disabled="!navbarShow" :default-checked="sidebarShow" @change="updateSidebar">
          <template #checked>显示</template>
          <template #unchecked>不显示</template>
        </a-switch>
      </div>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent,computed, watchEffect,ref } from 'vue'
import { useAppHook } from '@/hooks/app'
export default defineComponent({
  setup() {
    const { navbarShow, updateNavbar, sidebarShow, updateSidebar, updateRightSetting, showRightSetting } = useAppHook()
    return { showRightSetting, updateRightSetting, updateNavbar, navbarShow, sidebarShow, updateSidebar }
  }
})
</script>
<style lang="less" scoped>
.right-setting-button{
  position: fixed;
  right: 0;
  top: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  background: @primary-color;
  justify-content: center;
  align-items: center;
  border-radius: 8px 0 0 8px;
  transform: translateY(-100%);
}
.right-setting-wrapper{
  padding: 8px;
  :deep(.item-setting-line) {
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .arco-switch{
      min-width: 70px;
    }
  }
}
</style>
