<template>
  <a-modal v-model:visible="visible" title="视频播放" width="auto" draggable @cancel="handleCancel">
    <div id="videoId"></div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
import type { PropType } from "vue"
import Player from "xgplayer"
import type { ApiFileItem } from "@/api/file"

const props = defineProps({
  fileInfo: {
    type: Object as PropType<ApiFileItem>,
    default: undefined
  },
  onClose: {
    type: Function,
    default: undefined
  }
})

const visible = ref(false)

onMounted(() => {
  visible.value = true
  nextTick(() => {
    new Player({
      id: "videoId",
      url: props.fileInfo?.src || "",
      lang: "zh-cn",
      autoplay: true,
      closeVideoClick: true,
      videoInit: true
    })
  })
})

const handleCancel = () => {
  visible.value = false
  props.onCancel && props.onCancel()
}

defineExpose({
  visible,
  handleCancel
})
</script>
