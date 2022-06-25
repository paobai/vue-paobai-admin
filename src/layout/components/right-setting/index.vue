<template>
  <div class="right-setting-button">
    <a-button type="primary" shape="circle" @click="updateRightSetting(true)">
      <a-icon-settings :style="{ color: '#ffffff', fontSize: '30pX' }" />
    </a-button>
  </div>
  <a-drawer
    :visible="showRightSetting"
    unmount-on-close
    :closable="false"
    cancel-text="关闭"
    :width="300"
    @cancel="updateRightSetting(false)">
    <template #title> 全局设置 </template>
    <template #footer>
      <a-button type="primary" @click="updateRightSetting(false)">关闭</a-button>
    </template>
    <div class="right-setting-wrapper">
      <h3>页面布局:</h3>
      <div class="item-line-space-between">
        <div>布局方式：</div>
        <a-radio-group v-model="layoutMode">
          <a-tooltip v-for="item in layoutModeList" :key="item.value" :content="item.details" position="lt">
            <a-radio :value="item.value">
              <span>{{ item.name }}</span>
            </a-radio>
          </a-tooltip>
        </a-radio-group>
      </div>
      <div class="item-line-space-between">
        显示内容底部(页脚)：
        <a-switch :default-checked="footerShow" @change="v => (footerShow = v)">
          <template #checked>显示</template>
          <template #unchecked>不显示</template>
        </a-switch>
      </div>
      <h3>页面样式风格:</h3>
      <div class="item-line-space-between">
        暗色模式：
        <a-switch :default-checked="darkAppTheme" @change="v => (darkAppTheme = v)">
          <template #checked>开启</template>
          <template #unchecked>关闭</template>
        </a-switch>
      </div>
      <div class="item-line-space-between">
        色弱模式：
        <a-switch :default-checked="weakness" @change="v => (weakness = v)">
          <template #checked>开启</template>
          <template #unchecked>关闭</template>
        </a-switch>
      </div>
      <div class="item-line-space-between">
        灰色模式：
        <a-switch :default-checked="gray" @change="v => (gray = v)">
          <template #checked>开启</template>
          <template #unchecked>关闭</template>
        </a-switch>
      </div>
      <div class="color-pick">
        <div>主题颜色：</div>
        <div class="color-pick-wrapper">
          <div
            v-for="color in sysColorList"
            :key="color"
            class="color-item"
            :style="{ backgroundColor: color }"
            @click="sysColor = color">
            <template v-if="color === sysColor">√</template>
          </div>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useAppHook } from "@/hooks/app"
import { sysColorList, layoutModeList } from "@/constant"
export default defineComponent({
  setup() {
    const {
      layoutMode,
      updateLayoutModel,
      darkAppTheme,
      updateRightSetting,
      showRightSetting,
      sysColor,
      updateFooterShow,
      footerShow,
      weakness,
      gray
    } = useAppHook()
    return {
      layoutModeList,
      layoutMode,
      updateLayoutModel,
      darkAppTheme,
      showRightSetting,
      updateRightSetting,
      sysColor,
      sysColorList,
      updateFooterShow,
      footerShow,
      weakness,
      gray
    }
  }
})
</script>
<style lang="less" scoped>
.right-setting-button {
  z-index: 1000;
  position: fixed;
  right: 0;
  top: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  background: rgb(var(--primary-5));
  justify-content: center;
  align-items: center;
  border-radius: 8px 0 0 8px;
  transform: translateY(-100%);
}
.right-setting-wrapper {
  padding: 8px;
  .item-line-space-between {
    line-height: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 16px;
    :deep(.arco-switch) {
      min-width: 70px;
    }
  }
  .color-pick {
    .color-pick-wrapper {
      display: flex;
      flex-wrap: wrap;
      .color-item {
        text-align: center;
        color: var(--color-white);
        cursor: pointer;
        flex-shrink: 0;
        border-radius: 8px;
        width: 20px;
        height: 20px;
        margin-top: 10px;
        margin-right: 20px;
      }
    }
  }
}
</style>
