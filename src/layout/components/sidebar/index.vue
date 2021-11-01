<template>
  <div class="app-sidebar">
    <menu-main></menu-main>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
import menuMain from "./menu-main.vue"
export default defineComponent({
  components: {
    menuMain
  },
  setup(props) {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.app-sidebar {
  .menu-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
