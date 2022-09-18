<template>
  <a-modal
    v-model:visible="visible"
    title="Modal Form"
    v-bind="$attrs"
    :body-style="{ maxHeight: modalMaxHeight + 'px' }">
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="ok">确定</a-button>
      </slot>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, getCurrentInstance, toRefs } from "vue"

export default defineComponent({
  props: {
    closeWhenCancel: {
      type: Boolean,
      default: true
    }
  },
  emits: ["register", "ok", "cancel"],
  setup(props, context) {
    let { closeWhenCancel } = toRefs(props)
    let visible = ref(false)
    let modalMaxHeight = window.innerHeight - 200
    let showModal = () => {
      visible.value = true
    }
    let closeModal = () => {
      visible.value = false
    }
    let ok = () => {
      context.emit("ok")
    }
    let cancel = () => {
      context.emit("cancel", () => closeModal())
      if (closeWhenCancel.value) closeModal()
    }
    onMounted(() => {
      context.emit("register", getCurrentInstance(), showModal, closeModal)
    })
    return {
      visible,
      ok,
      cancel,
      modalMaxHeight
    }
  }
})
</script>

<style lang="less" scoped>
.index {
}
</style>
