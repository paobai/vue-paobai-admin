<template>
  <div class="member normal-layout-content">
    <div class="left-wrapper">
      <div class="top-wrapper">
        <div class="title">组织机构</div>
      </div>
      <div class="bottom-wrapper">
        <dept-tree ref="deptTreeRef" @getTreeFocusNum="getTreeFocusNum"></dept-tree>
        <div class="options-wrapper">
          <a-button type="primary" class="large-options-bt" @click="addDeptEvent">
            <template #icon>
              <a-icon-plus />
            </template>
            新增组织
          </a-button>
        </div>
      </div>
    </div>
    <div class="right-wrapper">
      <dept-mem :dept-id="currentFocusNum" @refreshData="refreshDeptData"></dept-mem>
    </div>
    <add-dept @register="modalRegister" @refreshData="refreshDeptData"></add-dept>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import deptTree from "@/components/dept-tree"
import addDept from "./components/add-dept.vue"
import { useModal } from "@/components/base-modal"
import deptMem from "./components/dept-mem.vue"

export default defineComponent({
  components: { deptTree, addDept, deptMem },
  setup() {
    let { modalRegister, modalInfo } = useModal()
    let deptTreeRef = ref<ComponentRef>(null)
    let currentFocusNum = ref<AppIdType>(-1)
    let addDeptEvent = () => {
      modalInfo.initFunction({ parentId: currentFocusNum.value })
    }
    let getTreeFocusNum = (v: AppIdType) => {
      currentFocusNum.value = v
    }
    let refreshDeptData = () => {
      ;(deptTreeRef.value as any).getTreeDataInit()
    }
    return {
      modalRegister,
      currentFocusNum,
      getTreeFocusNum,
      addDeptEvent,
      deptTreeRef,
      refreshDeptData
    }
  },
  methods: {}
})
</script>

<style lang="less" scoped>
.member {
  display: flex;
  padding: 0;
  border: 1px solid @border-color;

  .left-wrapper {
    display: flex;
    flex-direction: column;
    width: 300px;
    border-right: 1px solid @border-color;

    .top-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 0 20px;

      .title {
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        color: #3f4650;
      }
    }

    .bottom-wrapper {
      position: relative;
      flex: 1;
      height: 0;
      padding: 20px;
      border-top: 1px solid #e5e6eb;

      .options-wrapper {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        text-align: center;
      }
    }
  }

  .right-wrapper {
    flex: 1;
    width: 0;
  }
}
</style>
