<template>
  <a-modal v-model:visible="visible" title="重命名" width="500px" modal-animation-name="el-fade" @cancel="handleCancel">
    <a-row justify="center" align="center">
      <a-form :model="form" :style="{ width: '80%' }">
        <a-form-item field="name" label="文件名称：" required>
          <a-input v-model="form.name" placeholder="请输入" allow-clear />
        </a-form-item>
      </a-form>
    </a-row>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import type { PropType } from "vue"
import type { ApiFileItem } from "@/api/file"

const props = defineProps({
  fileInfo: {
    type: Object as PropType<ApiFileItem>,
    default: undefined
  },
  onClose: {
    type: Function,
    default: undefined
  }
})

const visible = ref(false)

type Form = { name: string }

const form: Form = reactive({
  name: ""
})

form.name = props.fileInfo?.name || ""

onMounted(() => {
  visible.value = true
})

const handleCancel = () => {
  visible.value = false
  props.onClose && props.onClose()
}

defineExpose({
  form,
  visible,
  handleCancel
})
</script>

<style lang="less" scoped>
.label {
  color: var(--color-text-2);
}

:deep(.arco-form-item) {
  margin-bottom: 0;
}

:deep(.arco-form-item-label-col > label) {
  white-space: nowrap;
}
</style>
