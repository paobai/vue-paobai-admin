<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <div class="bottom-wrapper">
      <sidebar></sidebar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs
} from "vue"
import navbar from "./components/navbar/index.vue"
import sidebar from "./components/sidebar/index.vue"
import appMain from "./components/app-main/index.vue"
export default defineComponent({
  name: "Layout",
  components: {
    navbar,
    sidebar,
    appMain
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
