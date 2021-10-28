<template>
  <template v-if="route.children && route.children.length > 0"></template>
</template>
<script>
import { defineComponent } from "vue"
import menuSub from "./menu-main.vue"
export default defineComponent({
  components: {
    menuSub
  },
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    let route = props.route
    return {
      route
    }
  }
})
</script>

<style lang="scss" scoped></style>
