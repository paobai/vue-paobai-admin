<template>
  <gi-option :class="{ option: showClassStyle }">
    <gi-option-item @click="onClickItem('rename')">
      <template #icon><gi-svg-icon name="menu-edit"></gi-svg-icon> </template>
      <span>重命名</span>
    </gi-option-item>
    <gi-option-item @click="onClickItem('move')">
      <template #icon><gi-svg-icon name="menu-move"></gi-svg-icon> </template>
      <span>移动到</span>
    </gi-option-item>
    <gi-option-item @click="onClickItem('download')">
      <template #icon><gi-svg-icon name="menu-download"></gi-svg-icon> </template>
      <span>下载</span>
    </gi-option-item>
    <a-popover
      v-if="props.fileInfo.extendName === 'zip'"
      position="right"
      :content-style="{ padding: 0, overflow: 'hidden', width: '150px' }"
      :arrow-style="{ display: 'none' }">
      <gi-option-item more>
        <template #icon><gi-svg-icon name="menu-zip"></gi-svg-icon> </template>
        <span>解压</span>
      </gi-option-item>
      <template #content>
        <gi-option>
          <gi-option-item @click="onClickItem('zip1')">
            <template #icon><gi-svg-icon name="file-rar"></gi-svg-icon> </template>
            <span>解压到当前目录</span>
          </gi-option-item>
          <gi-option-item @click="onClickItem('zip2')">
            <template #icon><gi-svg-icon name="file-rar"></gi-svg-icon> </template>
            <span>解压到其他目录</span>
          </gi-option-item>
        </gi-option>
      </template>
    </a-popover>
    <gi-option-item @click="onClickItem('detail')">
      <template #icon><gi-svg-icon name="menu-detail"></gi-svg-icon> </template>
      <span>详情</span>
    </gi-option-item>
    <gi-option-item @click="onClickItem('delete')">
      <template #icon><gi-svg-icon name="menu-delete"></gi-svg-icon> </template>
      <span>删除</span>
    </gi-option-item>
  </gi-option>
</template>

<script setup lang="ts">
import GiOption from "@/components/gi/gi-option.vue"
import GiOptionItem from "@/components/gi/gi-optionItem.vue"
import type { PropType } from "vue"
import type { ApiFileItem } from "@/api/file"
import GiSvgIcon from "@/components/gi/gi-svg-icon.vue"

const props = defineProps({
  // 文件数据
  fileInfo: {
    type: Object as PropType<ApiFileItem>,
    default: () => {}
  },
  showClassStyle: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["click"])

const onClickItem = (mode: string) => {
  emit("click", mode)
}
</script>

<style lang="less" scoped>
.option {
  box-sizing: border-box;
  overflow: hidden;
  background: var(--color-bg-popup);
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 12%), 0 0 6px rgba(0, 0, 0, 4%);
}
</style>
