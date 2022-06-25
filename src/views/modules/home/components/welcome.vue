<template>
  <a-card
    :body-style="{ overflowY: 'auto', display: 'flex' }"
    :loading="loading"
    class="welcome-card"
    :title="'欢迎回来！' + userInfo.realName">
    <div class="welcome-content">
      <a-row align="center" :gutter="24" justify="space-between">
        <a-col style="flex: 1 1 200px; margin-bottom: 20px; text-align: center">
          <a-avatar :size="100">
            <img alt="avatar" :src="userInfo.avatar" />
          </a-avatar>
        </a-col>
        <a-col flex="auto" style="text-align: center">
          <div style="text-align: left; display: inline-block">
            <a-typography>
              <a-typography-title style="margin-top: 0" :heading="4">{{
                new Date().format("yyyy-MM-dd HH:mm")
              }}</a-typography-title>
              <a-typography-paragraph> 今日温度：5~17℃。</a-typography-paragraph>
              <a-typography-paragraph> 东南风3-4级，晴。</a-typography-paragraph>
              <a-typography-title :heading="4">你若安好，便是晴天。</a-typography-title>
              <a-typography-paragraph type="secondary" style="margin-bottom: 0"
                >听说动动小手点点star就马上加薪啊，喂。</a-typography-paragraph
              >
            </a-typography>
          </div>
        </a-col>
        <a-col style="text-align: center; flex: 1 1 200px">
          <a-statistic animation style="margin-right: 64px" title="待办事项" :value="6" />
          <a-statistic animation title="待查信息" :value="18" />
        </a-col>
      </a-row>
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
    margin-top: 20px;
    flex: 1;
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
