<template>
  <base-modal
    :title="formData.id ? '编辑人员' : '新增人员'"
    width="690px"
    @ok="handleOk"
    @register="modalInnerRegister">
    <a-form ref="arcoForm" :model="formData" auto-label-width>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item field="realName" label="姓名：" :rules="[{ required: true, message: '请输入' }]">
            <a-input v-model="formData.realName" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="sex" label="性别：" :rules="[{ required: true, message: '请输入' }]">
            <a-radio-group v-model="formData.sex">
              <a-radio :value="0">女</a-radio>
              <a-radio :value="1">男</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item field="deptObj" label="部门：" :rules="[{ required: true, message: '请选择' }]">
            <user-organize-select-single v-model="formData.deptObj" only-dept></user-organize-select-single>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="roles" label="角色：">
            <a-select v-model="formData.roles" multiple :max-tag-count="1" placeholder="请选择">
              <a-option v-for="item in roleList" :key="item.id" :value="item.id" :label="item.roleName"></a-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item field="mobile" label="手机号码：">
            <a-input v-model="formData.mobile" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeMount, getCurrentInstance } from "vue"
import { resetFormData } from "@/utils/form-data"
import { modalMixins, useModalInner } from "@/components/base-modal"
import type { modalInnerInfoType } from "@/components/base-modal"
import { SexEnum } from "@/enums/app"
import { userOrganizeSelectSingle, CompValueSingle } from "@/components/user-organize-select"
import { PersonApi, RoleApi, UserApi } from "@/api/upms"
import { getArcoFormRef } from "@/hooks/arco"
import { Message } from "@arco-design/web-vue"

export default defineComponent({
  components: { userOrganizeSelectSingle },
  mixins: [modalMixins],
  emits: ["refreshData"],
  setup(props, context) {
    let sourceFormData = {
      id: "",
      realName: "",
      sex: SexEnum.WOMAN as SexEnum,
      mobile: "",
      deptObj: { deptId: "" } as CompValueSingle,
      deptId: "",
      administrative: "",
      roles: [] as string[],
      userId: ""
    }
    let formData = reactive(resetFormData({}, sourceFormData))
    let initFunction = (modalInnerInfo: modalInnerInfoType, data: typeof sourceFormData) => {
      // 这个方法里面用到了modalInnerInfo对象的方法,比如
      resetFormData(formData, sourceFormData, data || {})
      if (data.userId) {
        UserApi.getDetailsById(data.userId).then(res => {
          formData.roles = res.data.roleIds
        })
      }
      formData.deptObj.deptId = formData.deptId
      modalInnerInfo.showModal()
    }
    let { modalInnerRegister, modalInnerInfo } = useModalInner(props, context, initFunction)
    let roleList = ref([])
    onBeforeMount(() => {
      RoleApi.get().then(res => {
        roleList.value = res.data
      })
    })
    let instance = getCurrentInstance()
    let handleOk = () => {
      getArcoFormRef(instance).validate(error => {
        if (error) return
        let methods: PromiseFn = PersonApi.add.bind(PersonApi)
        if (formData.id) methods = PersonApi.update.bind(PersonApi)
        formData.deptId = formData.deptObj.deptId!
        methods(formData, formData.id).then(() => {
          Message.success("成功")
          context.emit("refreshData")
          modalInnerInfo.closeModal()
        })
      })
    }
    return {
      modalInnerRegister,
      formData,
      handleOk,
      roleList
    }
  }
})
</script>

<style lang="less" scoped>
.add-or-edit-person {
}
</style>
