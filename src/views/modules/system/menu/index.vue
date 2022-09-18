<template>
  <div class="menu normal-layout-content">
    <menu-mng></menu-mng>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import menuMng from "./component/menu-mng.vue"

export default defineComponent({
  components: {
    menuMng
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
