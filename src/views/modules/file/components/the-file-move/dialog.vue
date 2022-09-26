<template>
  <a-modal
    v-model:visible="visible"
    title="移动到"
    width="500px"
    modal-animation-name="el-dialog"
    mask-animation-name="el-mask"
    @cancel="handleCancel">
    <a-form :model="form" :style="{ width: '100%' }" label-align="left">
      <a-form-item field="path" label="目标路径：" required>
        <a-input v-model="form.path" placeholder="请输入" />
      </a-form-item>
    </a-form>
    <section class="tree-box">
      <a-tree show-line size="mini" block-node :data="treeData" @select="handleClickNode">
        <template #switcher-icon="node, { expanded }">
          <gi-svg-icon v-if="node.children && expanded" name="plus-square" :size="16" />
          <gi-svg-icon
            v-else-if="node.children && !expanded"
            name="minus-square"
            :size="16"
            style="transform: rotate(0deg)" />
          <icon-drive-file v-else :size="16" />
        </template>
        <template #icon>
          <gi-svg-icon name="menu-zip" :size="16"></gi-svg-icon>
        </template>
      </a-tree>
    </section>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import type { PropType } from "vue"
import type { ApiFileItem } from "@/api/file"
import type { TreeNodeData } from "@arco-design/web-vue"
import data from "./treedata"
import GiSvgIcon from "@/components/gi/gi-svg-icon.vue"

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

type Form = { path: string }
const form: Form = reactive({
  path: "/"
})

const treeData = ref<object[]>([])

treeData.value = data
onMounted(() => {
  visible.value = true
})

const handleClickNode = (
  selectedKeys: Array<string | number>,
  data: { selected?: boolean; selectedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event }
) => {
  form.path = `/${data.selectedNodes[0].title}`
}

const handleCancel = () => {
  visible.value = false
  props.onClose && props.onClose()
}

defineExpose({
  form,
  visible,
  treeData,
  handleClickNode,
  handleCancel
})
</script>

<style lang="less" scoped>
.label {
  color: var(--color-text-2);
}

:deep(.arco-form-item-label-col > label) {
  white-space: nowrap;
}

:deep(.arco-tree-node-switcher-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tree-box {
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  padding: 10px 16px;
  overflow: auto;
  border: 1px solid var(--color-border);
}
</style>
