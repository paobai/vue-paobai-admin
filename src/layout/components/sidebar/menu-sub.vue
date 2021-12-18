<template>
  <template v-if="menuItem.children && menuItem.children.length > 0">
    <a-sub-menu :key="menuItem.key" :title="menuItem.title">
      <template #expand-icon-down>
        <a-icon-down :style="{ color: 'rgba(255, 255, 255, 0.7)' }" />
      </template>
      <menu-sub v-for="childrenRoute in menuItem.children" :menuItem="childrenRoute" :key="childrenRoute.key"></menu-sub>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="menuItem.key" >
      {{menuItem.title}}
    </a-menu-item>
  </template>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: 'SubMenu',
  components: {
  },
  props: {
    menuItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // let menuItem = props.menuItem
    // return {
    //   menuItem
    // }
  }
})
</script>

<style lang="less" scoped></style>
