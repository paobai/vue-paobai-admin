<template>
  <div v-if="windowWidth > 715" class="file-aside">
    <gi-title title="文件管理"></gi-title>
    <a-menu
      :style="{ width: '220px', height: '100%', 'border-radius': '2px' }"
      :default-open-keys="['0']"
      :default-selected-keys="[currentKey]">
      <a-sub-menu key="0">
        <template #icon>
          <a-icon-apps></a-icon-apps>
        </template>
        <template #title>文件类型</template>
        <a-menu-item v-for="item in fileTypeList" :key="item.value.toString()" @click="onClickMenuItem(item)">
          <template #icon>
            <gi-svg-icon :size="28" :name="item.menuIcon"></gi-svg-icon>
          </template>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useWindowSize } from "@vueuse/core"
import { fileTypeList } from "@/constant/file"
import type { fileTypeListItemType } from "@/constant/file"
import GiSvgIcon from "@/components/gi/gi-svg-icon.vue"
import GiTitle from "@/components/gi/gi-title.vue"
const route = useRoute()
const router = useRouter()

const { width: windowWidth } = useWindowSize()

const currentKey = ref("0")

// 监听路由变化
watch(
  () => route.query,
  () => {
    if (route.query.fileType) {
      currentKey.value = route.query.fileType.toString()
    }
  },
  {
    immediate: true
  }
)

// 点击事件
const onClickMenuItem = (item: fileTypeListItemType) => {
  router.push({ path: "/file/main", query: { fileType: item.value } })
}
</script>

<style lang="less" scoped>
.file-aside {
  height: fit-content;
  margin: 16px 0 16px 16px;
  background: var(--color-bg-1);
  border-radius: 2px;
}
</style>
