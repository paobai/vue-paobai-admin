<template>
  <a-col class="banner">
    <a-col :span="8">
      <a-typography-title :heading="5" style="margin-top: 0"> 欢迎回来！ {{ userInfo.name }} </a-typography-title>
    </a-col>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useUserStoreWithOut } from "@/store/modules/user.ts"
export default defineComponent({
  setup() {
    const userStore = useUserStoreWithOut()
    const userInfo = computed(() => {
      return {
        name: userStore.getUserInfo.realName
      }
    })
    return {
      userInfo
    }
  }
})
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  padding: 20px 20px 0 20px;
  background-color: var(--color-bg-2);
  border-radius: 4px 4px 0 0;
}

:deep(.arco-icon-home) {
  margin-right: 6px;
}
</style>
