<template>
  <a-card
      class="general-card"
      title="舆情分析"
      :header-style="{ paddingBottom: '12px' }"
  >
    <a-row :gutter="12">
      <a-col :span="6">
        <ChainItem
            title="访问总人次"
            quota="visitors"
            chart-type="line"
            :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
            title="内容发布量"
            quota="published"
            chart-type="bar"
            :card-style="{
            background: isDark
              ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
              : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
          }"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
            title="评论总量"
            quota="comment"
            chart-type="line"
            :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #294B94 0%, #0F275C 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
            title="分享总量"
            quota="share"
            chart-type="pie"
            :card-style="{background: 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)'}"
        />
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChainItem from './chain-item.vue';

export default defineComponent({
  components: {
    ChainItem,
  },
  setup() {
    return {isDark: false}
  },
});
</script>
