<template>
  <svg aria-hidden="true" class="svg-icon" :style="{ width: iconSize, height: iconSize }">
    <use :xlink:href="symbolId" :fill="color ? color : 'none'" />
  </svg>
</template>

<script lang="ts">
import "./iconfont"
import { defineComponent, computed, toRefs } from "vue"
import type { PropType } from "vue"

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String as PropType<string>,
      default: "icon"
    },
    name: {
      type: String as PropType<string>,
      required: true
    },
    color: {
      type: String as PropType<string>,
      default: ""
    },
    size: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props) {
    let { prefix, name } = toRefs(props)
    const symbolId = computed(() => {
      let resName = `#${name.value}`
      if (!props.name.startsWith("icon-")) resName = `#${prefix.value}-${name.value}`
      return resName
    })
    return { symbolId }
  },
  computed: {
    iconSize() {
      if (this.size === 0) return ""
      return this.getUnitValue(this.size)
    }
  },
  methods: {
    getUnitValue(value: string | number): string | number {
      return /(px|em|rem|%)$/.test(value.toString()) ? value : value + "px"
    }
  }
})
</script>
<style lang="less" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  color: transparent;
  fill: currentcolor;
}
</style>
