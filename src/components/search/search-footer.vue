<template>
  <div class="app-search-footer">
    <a-icon-import size="22" />
    <span>确认</span>
    <a-icon-arrow-rise size="22" />
    <a-icon-arrow-fall size="22" />
    <span>切换</span>
    <a-icon-close size="22" />
    <span>关闭</span>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped>
.app-search-footer {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  font-size: 12px;
  background-color: var(--color-bg-1);
  border-top: 1px solid var(--color-border);
  border-radius: 0 0 16px 16px;

  .arco-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 0.4em;
    background-color: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 40%);

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(6) {
      margin-left: 14px;
    }
  }
}
</style>
