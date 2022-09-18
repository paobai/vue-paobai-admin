<template>
  <a-tree-select
    v-model="selected"
    class="user-organize-select-single"
    dropdown-class-name="user-organize-select-multi-single"
    :field-names="fieldNames"
    :data="treeData"
    allow-search
    placeholder="请选择"
    :filter-tree-node="filterTreeNode"></a-tree-select>
</template>

<script lang="ts">
import { ref, watch } from "vue"
import { DeptApi } from "@/api/upms"
import {
  fixApiTreeData,
  loadsValueToSelectSingle,
  dumpsSelectToValueSingle,
  getTreeMapNode,
  addDisableToDeptNode
} from "../help"
import type { CompValueSingle, treeMapNode, NodeBase } from "../interface"
export default {
  props: {
    modelValue: {
      type: Object,
      default: (): CompValueSingle => {
        // 二取一
        return {
          userId: "",
          deptId: ""
        }
      }
    },
    // 只选择user
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
      // 处理是否只为user
      if (props.onlyUser) addDisableToDeptNode(fixTreeData)
      treeMapNode.value = getTreeMapNode(fixTreeData)
      selected.value = loadsValueToSelectSingle(props.modelValue)
      treeData.value = fixTreeData
      watch(
        selected,
        () => {
          let newValue = dumpsSelectToValueSingle(treeMapNode.value, selected.value)
          if (JSON.stringify(newValue) !== JSON.stringify(props.modelValue)) emit("update:modelValue", newValue)
        },
        { immediate: true }
      )
      watch(
        () => props.modelValue,
        (value, preValue) => {
          if (JSON.stringify(value) !== JSON.stringify(preValue)) selected.value = loadsValueToSelectSingle(value)
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
      filterTreeNode
    }
  }
}
</script>

<style lang="less" scoped>
.user-organize-select-single {
}
</style>
<style lang="less">
.user-organize-select-multi-single.arco-tree-select-popup {
  .arco-tree-node {
    &.arco-tree-node-disabled {
      .arco-tree-node-title {
        color: var(--color-text-1);
      }
    }
  }
}
</style>
