<template>
  <a-card class="general-card" title="快捷操作">
    <a-space direction="vertical" fill :size="10">
      <a-button long>
        切换清晰度
        <template #icon>
          <a-icon-tags />
        </template>
      </a-button>
      <a-button long>
        主备流切换
        <template #icon>
          <AIconSwap />
        </template>
      </a-button>
      <a-button long>
        摘除清晰度
        <template #icon>
          <AIconStop />
        </template>
      </a-button>
      <a-button long>
        推流垫片
        <template #icon>
          <AIconArrowRight />
        </template>
      </a-button>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({})
</script>
