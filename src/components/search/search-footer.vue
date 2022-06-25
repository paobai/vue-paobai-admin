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
  height: 44px;
  padding: 0 16px;
  font-size: 12px;
  background-color: var(--color-bg-1);
  border-top: 1px solid var(--color-border);
  border-radius: 0 0 16px 16px;
  align-items: center;
  flex-shrink: 0;

  .arco-icon {
    display: flex;
    width: 20px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 0.4em;
    background-color: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgb(30 35 90 / 40%);
    align-items: center;
    justify-content: center;

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(6) {
      margin-left: 14px;
    }
  }
}
</style>
