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
      <a-divider orientation="center"><span class="title">页面布局</span></a-divider>
      <div class="item-line-space-between">
        <div style="margin-bottom: 16px">布局方式：</div>
        <layout-mode></layout-mode>
      </div>
      <div class="item-line-space-between">
        显示内容底部(页脚)：
        <a-switch :default-checked="footerShow" @change="v => (footerShow = v)">
          <template #checked>显示</template>
          <template #unchecked>不显示</template>
        </a-switch>
      </div>
      <a-divider orientation="center"><span class="title">页面样式风格</span></a-divider>
      <div class="item-line-space-between">
        暗色模式：
        <a-switch :default-checked="darkAppTheme" @change="v => (darkAppTheme = v)">
          <template #checked><a-icon-sun-fill size="16px" /></template>
          <template #unchecked><a-icon-moon-fill size="16px" style="color: var(--color-text-1)" /></template>
        </a-switch>
      </div>
      <div class="item-line-space-between">
        色弱模式：
        <a-switch :default-checked="weakness" @change="v => (weakness = v)">
          <template #checked>开</template>
          <template #unchecked>关</template>
        </a-switch>
      </div>
      <div class="item-line-space-between">
        灰色模式：
        <a-switch :default-checked="gray" @change="v => (gray = v)">
          <template #checked>开</template>
          <template #unchecked>关</template>
        </a-switch>
      </div>
      <div class="color-pick">
        <a-divider orientation="center"><span class="title">主题颜色</span></a-divider>
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
import { sysColorList } from "@/constant"
import LayoutMode from "./components/layout-mode.vue"
export default defineComponent({
  components: {
    LayoutMode
  },
  setup() {
    const {
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
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgb(var(--primary-5));
  border-radius: 8px 0 0 8px;
  transform: translateY(-100%);
}

.right-setting-wrapper {
  padding: 8px;

  .arco-divider {
    margin: 30px 0;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
  }

  .item-line {
    margin-bottom: 16px;
  }

  .item-line-space-between {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    line-height: 26px;
    .item-line;

    :deep(.arco-switch) {
      min-width: 50px;
    }
  }

  .color-pick {
    .color-pick-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, 20px);
      grid-gap: 12px;

      .color-item {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-top: 10px;
        margin-right: 20px;
        color: var(--color-white);
        text-align: center;
        cursor: pointer;
        border-radius: 8px;
      }
    }
  }
}
</style>
