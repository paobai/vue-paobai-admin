<template>
  <div class="app-sidebar" :class="{'menu-collapse': collapse}">
    <div class="logo-wrapper">
      <img class="logo logo-big" src="/src/assets/images/common/logo-with-text-small.png" />
      <img class="logo logo-small" src="/src/assets/images/common/logo.png" />
    </div>
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
  display: flex;
  flex-direction: column;
  &.menu-collapse{
    .logo-wrapper{
      .logo-big{
        display: none;
      }
      .logo-small{
        display: unset;
      }
    }
  }
  .logo-wrapper{
    display: none;
    width: 100%;
    height: @app-navbar-height;
    line-height: @app-navbar-height;
    text-align: center;
    .logo {
      vertical-align: middle;
    }
    .logo-big{
      width: 130px;
    }
    .logo-small{
      width: 40px;
      display: none;
    }
  }
  .menu-wrapper {
    height: 0;
    flex: 1;
  }
}
</style>
