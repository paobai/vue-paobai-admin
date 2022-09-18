<template>
  <slot click-event="clickEvent"></slot>
  <input ref="fileInt" type="file" style="display: none" @change="changeFile" />
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  emits: ["getFileEvent"],
  setup() {
    return {}
  },
  data() {
    return {
      distButton: null
    }
  },
  mounted() {
    this.distButton = this.$el.nextElementSibling
    if (this.distButton) {
      this.distButton.addEventListener("click", this.clickEvent)
    }
  },
  beforeUnmount() {
    if (this.distButton) {
      this.distButton.removeEventListener("click", this.clickEvent)
    }
  },
  methods: {
    clickEvent() {
      this.$refs.fileInt.click()
    },
    changeFile() {
      const file = this.$refs.fileInt.files[0]
      if (!file) return
      this.$emit("getFileEvent", file)
      this.$refs.fileInt.value = ""
    }
  }
})
</script>

<style lang="less" scoped>
.upload-not-show {
}
</style>
