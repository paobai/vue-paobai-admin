<template>
  <div class="menu normal-layout-content">
    <a-tabs default-active-key="1" justify animation size="large">
      <a-tab-pane key="1" title="菜单管理"> <menu-mng></menu-mng> </a-tab-pane>
      <a-tab-pane key="2" title="资源管理"> <resource-mng></resource-mng> </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import menuMng from "./component/menu-mng.vue"
import resourceMng from "./component/resource-mng.vue"

export default defineComponent({
  components: {
    menuMng,
    resourceMng
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.menu {
}
</style>
