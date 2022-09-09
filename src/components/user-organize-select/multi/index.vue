<template>
  <a-tree-select
    v-model="selected"
    class="user-organize-select-multi"
    dropdown-class-name="user-organize-select-multi-dropdown"
    :field-names="fieldNames"
    :data="treeData"
    tree-checkable
    allow-search
    :max-tag-count="2"
    multiple
    placeholder="请选择"
    :filter-tree-node="filterTreeNode"
    tree-checked-strategy="parent"
    v-bind="$attrs">
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
  </a-tree-select>
</template>

<script lang="ts">
import { ref, watch } from "vue"
import { DeptApi } from "@/api/upms"
import { fixApiTreeData, loadsValueToSelectMulti, dumpsSelectToValueMulti, getTreeMapNode } from "../help"
import type { CompValueMulti, treeMapNode, NodeBase } from "../interface"
export default {
  props: {
    modelValue: {
      type: Object,
      default: (): CompValueMulti => {
        return {
          userList: [],
          deptList: []
        }
      }
    },
    // 控制是否数据返回不叠加parent
    onlyUser: {
      type: Boolean,
      default: false
    },
    onlyDept: {
      type: Boolean,
      default: false
    },
    sourceTreeData: {
      type: Object,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(props: any, { emit }: any) {
    // 处理是否只为user
    let treeCheckedStrategy = ref("parent")
    // if (props.onlyUser) treeCheckedStrategy.value = "child"
    const filterTreeNode = (searchValue: string, nodeData: NodeBase) => {
      return nodeData.label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    }
    let treeData = ref()
    let treeMapNode = ref<treeMapNode>({})
    let selected = ref()
    let sourceTreeData = JSON.parse(JSON.stringify(props.sourceTreeData))
    let initData = () => {
      // 处理过滤以及是否只为dept
      let fixTreeData = fixApiTreeData(sourceTreeData, props.onlyDept)
      treeData.value = fixTreeData
      treeMapNode.value = getTreeMapNode(fixTreeData)
      selected.value = loadsValueToSelectMulti(props.modelValue, treeData.value, treeMapNode.value, props.onlyUser)
      watch(
        selected,
        () => {
          let newValue = dumpsSelectToValueMulti(treeMapNode.value, selected.value, props.onlyUser)
          if (JSON.stringify(newValue) !== JSON.stringify(props.modelValue)) emit("update:modelValue", newValue)
        },
        { immediate: true }
      )
      watch(
        () => props.modelValue,
        (value, preValue) => {
          if (JSON.stringify(value) !== JSON.stringify(preValue))
            selected.value = loadsValueToSelectMulti(value, treeData.value, treeMapNode.value, props.onlyUser)
        }
      )
    }
    if (!sourceTreeData) {
      DeptApi.getDeptManTree().then(res => {
        sourceTreeData = res.data
        initData()
      })
    } else {
      initData()
    }
    const fieldNames = {
      key: "key",
      title: "label",
      children: "children"
    }

    return {
      treeData,
      selected,
      fieldNames,
      treeCheckedStrategy,
      filterTreeNode
    }
  }
}
</script>

<style lang="less" scoped>
.index {
}
</style>
