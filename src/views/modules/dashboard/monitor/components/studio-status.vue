<template>
  <a-card class="general-card" title="直播状态">
    <template #extra>
      <a-tag color="green">流畅</a-tag>
    </template>
    <a-descriptions layout="horizontal" :data="dataStatus" :column="2">
      <template #label="{ label }">
        <span v-if="['mainstream', 'hotStandby', 'coldStandby'].includes(label)">
          <a-typography-text style="padding-right: 8px">
            {{ label }}
          </a-typography-text>
          码率
        </span>
        <span v-else>{{ label }}</span>
      </template>
    </a-descriptions>
    <a-typography-title style="margin-bottom: 16px" :heading="6"> 画面信息 </a-typography-title>
    <a-descriptions layout="horizontal" :data="dataPicture" :column="2" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({
  setup() {
    const dataStatus = computed(() => [
      {
        label: "主流",
        value: "6 Mbps"
      },
      {
        label: "帧率",
        value: "60"
      },
      {
        label: "热备",
        value: "6 Mbps"
      },
      {
        label: "帧率",
        value: "60"
      },
      {
        label: "冷备",
        value: "6 Mbps"
      },
      {
        label: "帧率",
        value: "60"
      }
    ])
    const dataPicture = computed(() => [
      {
        label: "线路",
        value: "热备"
      },
      {
        label: "CDN",
        value: "KS"
      },
      {
        label: "播放格式",
        value: "FLV"
      },
      {
        label: "画质",
        value: "原画"
      }
    ])
    return {
      dataStatus,
      dataPicture
    }
  }
})
</script>

<style scoped lang="less">
:deep(.arco-descriptions-item-label) {
  padding-right: 6px;
}
</style>
