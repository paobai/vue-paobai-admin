<template>
  <img v-if="isImg" class="img" :src="props.data.src || ''" />
  <gi-svg-icon v-else size="100%" :name="getFileImg"></gi-svg-icon>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { PropType } from "vue"
import { fileExtendNameIconMap, imageTypeList } from "@/constant/file"
import GiSvgIcon from "@/components/gi/gi-svg-icon.vue"
import type { ApiFileItem } from "@/api/file"

const props = defineProps({
  // 文件数据
  data: {
    type: Object as PropType<ApiFileItem>,
    default: () => {}
  }
})

// 是否是图片类型文件
const isImg = computed<boolean>(() => {
  return imageTypeList.includes(props.data.extendName.toLowerCase())
})

// 获取文件图标，如果是图片这显示图片
const getFileImg = computed<string>(() => {
  if (props.data.isDir) {
    return fileExtendNameIconMap["dir"] || ""
  } else if (imageTypeList.includes(props.data.extendName.toLowerCase())) {
    return props.data.src || ""
  } else if (!Object.keys(fileExtendNameIconMap).includes(props.data.extendName.toLowerCase())) {
    return fileExtendNameIconMap["other"] || ""
  } else {
    return fileExtendNameIconMap[props.data.extendName.toLowerCase()] || ""
  }
})
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
