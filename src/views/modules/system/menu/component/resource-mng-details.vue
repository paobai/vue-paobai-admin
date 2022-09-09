<template>
  <base-modal width="690px" title="资源" class="task-settings" @register="modalInnerRegister" @ok="confirm">
    <a-form ref="arcoForm" :model="formData" :inline="true" auto-label-width>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所属资源组：" field="groupId" :rules="[{ required: true, message: '请输入' }]">
            <a-select v-model="formData.groupId">
              <a-option
                v-for="item in resourceGroupList"
                :key="item.groupId"
                :value="item.groupId"
                :label="item.groupName"></a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="资源名称：" field="resourceName" :rules="[{ required: true, message: '请输入' }]">
            <a-input v-model="formData.resourceName" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="资源标识："
            field="permissionCode"
            style="margin-bottom: 0"
            :rules="[{ required: true, message: '请输入' }]">
            <a-input v-model="formData.permissionCode" placeholder="请输入" label="权限标识"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否锁定：" field="lockFlag">
            <a-radio-group v-model="formData.lockFlag" style="width: 220px">
              <a-radio :value="false">否</a-radio>
              <a-radio :value="true">是</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排序号：" field="sort">
            <a-input-number v-model="formData.sort" placeholder="请输入" :min="0" label="排序号"></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, getCurrentInstance } from "vue"
import { useModalInner, modalMixins } from "@/components/base-modal"
import type { modalInnerInfoType } from "@/components/base-modal"
import { resetFormData } from "@/utils/form-data"
import type { ResourceApiType } from "@/api/upms"
import { getArcoFormRef } from "@/hooks/arco"
import { ResourceApi } from "@/api/upms"
import { Message } from "@arco-design/web-vue"

export default defineComponent({
  mixins: [modalMixins],
  emits: ["refreshData"],
  setup(props, context) {
    let resourceGroupList = inject("resourceGroupList") as ResourceApiType.resourceGroupItem[]
    let sourceFormData: ResourceApiType.resourceItem = {
      id: "",
      groupId: "",
      lockFlag: false,
      permissionCode: "",
      resourceName: "",
      sort: 0
    }
    let formData = reactive(resetFormData({}, sourceFormData))
    let instance = getCurrentInstance()
    let initFunction = (modalInnerInfo: modalInnerInfoType, data: typeof sourceFormData) => {
      resetFormData(formData, sourceFormData, data || {})
      modalInnerInfo.showModal()
      getArcoFormRef(instance).clearValidate()
    }
    let { modalInnerRegister, modalInnerInfo } = useModalInner(props, context, initFunction)
    const confirm = () => {
      getArcoFormRef(instance).validate(error => {
        if (error) return
        let methods: PromiseFn = ResourceApi.add
        if (formData.id) methods = ResourceApi.update
        methods
          .bind(ResourceApi)(formData, formData.id)
          .then(() => {
            context.emit("refreshData")
            modalInnerInfo.closeModal()
            Message.success("成功")
          })
      })
    }
    return {
      modalInnerRegister,
      formData,
      resourceGroupList,
      confirm
    }
  }
})
</script>

<style lang="less" scoped>
.resource-mng-details {
}
</style>
