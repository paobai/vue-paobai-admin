<template>
  <div class="file-manage">
    <FileAside></FileAside>
    <FileMain></FileMain>
  </div>
</template>

<script setup lang="ts" name="FileManage">
import FileAside from "./file-aside.vue"
import FileMain from "./file-main/index.vue"
</script>

<style lang="less" scoped>
.file-manage {
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
}
</style>
