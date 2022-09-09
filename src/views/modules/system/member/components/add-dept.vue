<template>
  <base-modal title="新增部门" width="378px" @ok="handleOk" @register="modalInnerRegister">
    <a-form ref="arcoForm" :model="formData" auto-label-width>
      <a-form-item field="choseParentDept" label="上级部门：" :rules="[{ required: true, message: '请选择' }]">
        <user-organize-select-single v-model="formData.choseParentDept" only-dept></user-organize-select-single>
      </a-form-item>
      <a-form-item field="name" label="部门名：" :rules="[{ required: true, message: '请输入' }]">
        <a-input v-model="formData.name" />
      </a-form-item>
    </a-form>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { DeptApi } from "@/api/upms"
import { modalMixins, useModalInner } from "@/components/base-modal"
import type { modalInnerInfoType } from "@/components/base-modal"
import { resetFormData } from "@/utils/form-data"
import { getArcoFormRef } from "@/hooks/arco"
import { userOrganizeSelectSingle, CompValueSingle } from "@/components/user-organize-select"

export default defineComponent({
  components: { userOrganizeSelectSingle },
  mixins: [modalMixins],
  emits: ["refreshData"],
  setup(props, context) {
    let sourceFormData = {
      parentId: "" as string | undefined,
      name: "",
      choseParentDept: {} as CompValueSingle
    }
    let formData = reactive(resetFormData({}, sourceFormData))
    let initFunction = (modalInnerInfo: modalInnerInfoType, data: typeof sourceFormData) => {
      resetFormData(formData, sourceFormData, data || {})
      if (data && data.parentId) {
        formData.choseParentDept = { deptId: data.parentId }
      }
      modalInnerInfo.showModal()
    }
    let { modalInnerRegister, modalInnerInfo } = useModalInner(props, context, initFunction)
    return {
      formData,
      modalInnerInfo,
      modalInnerRegister
    }
  },
  methods: {
    handleOk() {
      getArcoFormRef(this).validate(error => {
        if (error) return
        this.formData.parentId = this.formData.choseParentDept.deptId
        DeptApi.add(this.formData).then(() => {
          this.$message.success("成功")
          this.modalInnerInfo.closeModal()
          this.$emit("refreshData")
        })
      })
    }
  }
})
</script>

<style lang="less" scoped>
.add-dept {
}
</style>
