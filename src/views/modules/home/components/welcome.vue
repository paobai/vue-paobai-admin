<template>
  <a-card :loading="loading" class="welcome-card" :title="'欢迎回来！' + userInfo.realName">
    <div class="welcome-content">
      <div class="header-wrapper">
        <div class="left-avatar">
          <a-avatar :size="64">
            <img alt="avatar" :src="userInfo.avatar" />
          </a-avatar>
        </div>
        <div class="center-content">
          <a-typography>
            <a-typography-title :heading="5">{{ new Date().format("yyyy-MM-dd HH:mm") }}</a-typography-title>
            <a-typography-paragraph> 今日温度：5~17℃。</a-typography-paragraph>
            <a-typography-paragraph> 东南风3-4级，晴。</a-typography-paragraph>
            <a-typography-title :heading="5">你若安好，便是晴天。</a-typography-title>
          </a-typography>
        </div>
        <div class="right-content">
          <a-statistic style="margin-right: 64px" title="待办事项" :value="6" />
          <a-statistic title="待查信息" :value="18" />
        </div>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue"
import { useUserHook } from "@/hooks/user"
export default defineComponent({
  setup() {
    const { userInfo } = useUserHook()
    const loading = inject("loading")
    return {
      userInfo,
      loading
    }
  }
})
</script>
<style lang="less" scoped>
.welcome-card {
  .welcome-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    .header-wrapper {
      display: flex;
      .left-avatar {
        display: flex;
        align-items: center;
      }
      .center-content {
        margin: 0 30px;
        width: 0;
        flex: 1;
      }
      .right-content {
        display: flex;
        align-items: center;
        margin-right: 20px;
        text-align: center;
      }
    }
  }
}
</style>
