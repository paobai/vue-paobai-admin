<template>
  <div class="app-sidebar" :class="{'menu-collapse': collapse}">
    <menu-main></menu-main>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
import menuMain from "./menu-main.vue"
import {useAppHook} from "@/hooks/app";
export default defineComponent({
  components: {
    menuMain
  },
  setup(props) {
    let { collapse } = useAppHook()
    return {
      collapse
    }
  }
})
</script>

<style lang="less" scoped>
.app-sidebar {
  .menu-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
