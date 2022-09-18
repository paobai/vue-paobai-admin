<template>
  <a-tree
    v-if="!loading"
    class="dept-tree"
    draggable
    :data="treeData"
    :field-names="{
      key: 'id',
      title: 'name',
      children: 'children',
      icon: ''
    }"
    @drop="dropEvent">
    <template #title="data">
      <div class="tree-item">
        <div class="tree-icon">
          <iconfont :class="getTreeImg(data.level).icon" :style="{ color: getTreeImg(data.level).color }"></iconfont>
          <div class="tip-count">{{ data.personCount }}</div>
        </div>
        <template v-if="!data.edit">
          <div
            :title="data.name"
            class="tree-name"
            :class="{ 'tree-hover': treeHoverNum === data.id, 'tree-focus': treeFocusNum === data.id }"
            @mouseover="treeHoverNum = data.id"
            @mouseleave="treeHoverNum = -1"
            @contextmenu="e => $emit('contextClick', e, data)"
            @click="itemNameClick(data)">
            <div class="text-nowrap tree-item-title">{{ data.name }}</div>

            <!--        总公司不可修改-->

            <div
              v-if="
                showTreeHover &&
                treeHoverNum === data.id &&
                (data.level !== 1 || (data.level === 1 && changeFirstLevel))
              "
              class="tree-options">
              <div @click="editEvent(data)"><a-icon-edit style="margin-right: 6px" /></div>
              <div @click="deleteEvent(data)"><a-icon-delete style="margin-right: 6px" /></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="tree-edit">
            <a-input :ref="'input-' + data.id" v-model="data.tempName"></a-input>
            <div class="tree-options">
              <div @click="updateEvent(data)"><a-icon-check style="margin-right: 6px" /></div>
              <div @click="cancelEvent(data)"><a-icon-close style="margin-right: 6px" /></div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </a-tree>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch } from "vue"
import { DeptApi } from "@/api/upms"

export default defineComponent({
  props: {
    showTreeHover: {
      type: Boolean,
      default: true
    },
    changeFirstLevel: {
      default: false,
      type: Boolean
    }
  },
  emits: ["contextClick", "editEvent", "deleteEvent", "getTreeFocusNum"],
  setup(props, context) {
    let loading = ref(true)
    let treeHoverNum = ref<AppIdType>()
    let treeFocusNum = ref<AppIdType>()
    watch(treeFocusNum, () => {
      context.emit("getTreeFocusNum", treeFocusNum.value)
    })
    let treeData = ref<any[]>([])
    let getTreeDataInit = () => {
      return DeptApi.get({ hiredStat: true }).then(res => {
        treeData.value = fixDept(res.data)
        loading.value = false
        if (!treeFocusNum.value) {
          setTreeFocus(treeData.value[0])
        }
      })
    }
    let setTreeFocus = (item: any) => {
      treeFocusNum.value = item.id
    }
    let itemNameClick = (item: any) => {
      setTreeFocus(item)
    }
    let fixDept = (sourceTree: any[], level = 1, parent: any = null) => {
      sourceTree.forEach(e => {
        e.level = level
        e.edit = false
        e.tempName = e.name
        e.parent = parent
        e.children = e.children || []
        fixDept(e.children, level + 1, e)
      })
      return sourceTree
    }
    onBeforeMount(() => {
      getTreeDataInit()
    })
    return {
      treeData,
      loading,
      treeHoverNum,
      treeFocusNum,
      getTreeDataInit,
      itemNameClick
    }
  },
  methods: {
    getTreeImg(level: number) {
      switch (level) {
        case 1:
          return { color: "#538DFF", icon: "icon-company" }
        case 2:
          return { color: "#F6C94E", icon: "icon-department" }
        case 3:
          return { color: "#F6C94E", icon: "icon-department" }
        default:
          return { color: "#F6C94E", icon: "icon-department" }
      }
    },
    editEvent(item: any) {
      item.edit = true
      console.log("----------")
      this.$nextTick(() => {
        let inputDist = this.$refs["input-" + item.id] as ComponentRef & { focus: Function }
        inputDist && inputDist.focus()
      })
    },
    deleteEvent(item: any) {
      this.$modal.warning({
        content: "是否删除该部门？",
        cancelText: "取消",
        closable: true,
        hideCancel: false,
        onOk: () => {
          DeptApi.delete(item.id).then(() => {
            this.$message.success("删除成功")
            if (this.treeFocusNum === item.id) this.treeFocusNum = null
            this.getTreeDataInit()
          })
        }
      })

      // this.$emit("deleteEvent", v)
    },
    updateEvent(item: any) {
      item.name = item.tempName
      DeptApi.update(item, item.id).then(() => {
        this.$message.success("成功")
        item.edit = false
      })
    },
    cancelEvent(item: any) {
      item.tempName = item.name
      item.edit = false
    },
    dropEvent({ dragNode, dropNode, dropPosition }) {
      let preDeptId = null
      let nextDeptId = null
      let parentId = null
      let parent = null
      let deptId = dragNode.id
      // 拖到了某个里面
      if (dropPosition === 0) {
        parent = dropNode
        parentId = dropNode.id
        if (parent.children.length > 0) preDeptId = parent.children[parent.children.length - 1].id
      } else {
        parent = dropNode.parent
        parentId = dropNode.parent.id
        let findIndex = parent.children.findIndex(item => item.id === dropNode.id)
        // 在dropNode后面
        if (dropPosition === 1) {
          preDeptId = dropNode.id
          if (findIndex != parent.children.length - 1) nextDeptId = parent.children[findIndex + 1].id
          // 在dropNode前面
        } else {
          nextDeptId = dropNode.id
          if (findIndex != 0) preDeptId = parent.children[findIndex - 1].id
        }
      }
      DeptApi.moveDept({
        deptId,
        nextDeptId,
        preDeptId,
        parentId
      })
        .then(() => {
          this.$message.success("成功")
        })
        .catch(() => {
          this.$message.error("失败")
        })
        .finally(() => {
          this.getTreeDataInit()
        })
    }
  }
})
</script>

<style lang="less" scoped>
.arco-tree {
  color: red;

  :deep(.arco-tree-node) {
    .arco-tree-node-title {
      flex: 1;
      width: 0;
      padding: 5px 0;

      &:hover {
        background: unset;
      }

      .arco-tree-node-title-text {
        display: flex;
        width: 100%;

        .arco-tree-node-drag-icon {
          display: none;
        }
      }
    }
  }
}

.dept-tree {
  .tree-item {
    display: flex;
    flex: 1;
    align-content: center;
    align-items: center;
    width: 0;
    height: 40px;

    .tree-icon {
      position: relative;
      padding-right: 18px;
      border-radius: 50%;

      .iconfont {
        font-size: 24px;
      }

      .tip-count {
        position: absolute;
        top: -4px;
        left: 18px;
        padding: 3px 5px;
        font-size: 12px;
        line-height: 12px;
        color: #fff;
        background: #69adff;
        border-radius: 16px;
        transform: scale(0.8);
      }
    }

    .tree-name {
      display: flex;
      flex: 1;
      width: 0;
      height: 36px;
      padding-right: 2px;
      padding-left: 8px;
      line-height: 36px;
      color: #262626;
      border-radius: 2px;

      &.tree-hover {
        //color: #ffffff;
        background-color: @normal-hover-color;
      }

      &.tree-focus {
        color: #fff;
        background-color: @primary-color;
        border-radius: 4px;
        box-shadow: 0 0 12px 0 #538dff80;
      }

      .tree-item-title {
        flex: 1;
        width: 0;
      }

      .tree-options {
        display: inline-flex;
        //position: absolute;
        //right: 20px;
        width: 40px;
      }
    }

    .tree-edit {
      display: flex;
      flex: 1;
      align-items: center;
      width: 0;

      .arco-input-wrapper {
        flex: 1;
        width: 0;
        margin-right: 6px;
      }

      .tree-options {
        display: inline-flex;
        //position: absolute;
        //right: 20px;
        width: 40px;
      }
    }
  }
}
</style>
