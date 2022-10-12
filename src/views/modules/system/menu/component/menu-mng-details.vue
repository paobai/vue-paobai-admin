<template>
  <base-modal width="690px" title="菜单" class="task-settings" @register="modalInnerRegister" @ok="confirm">
    <a-form ref="arcoForm" :model="formData" :inline="true" auto-label-width>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单名称：" field="title" :rules="[{ required: true, message: '请输入' }]">
            <a-input v-model="formData.title"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12"
          ><a-form-item label="菜单标识：" field="menuKey"> <a-input v-model="formData.key"></a-input> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="上级菜单：" field="parentTitle">
            <a-tree-select
              v-model="formData.parentKey"
              :data="menuTree"
              :field-names="{
                key: 'key',
                title: 'title',
                children: 'children',
                icon: 'icon2'
              }"></a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="12"
          ><a-form-item label="菜单路由：" field="path"> <a-input v-model="formData.path"></a-input> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="菜单类型：" field="type">
            <a-select v-model="formData.type">
              <a-option v-for="item in RouteEnumMap" :key="item.value" :value="item.value" :label="item.name">
              </a-option>
            </a-select> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="排序号：" field="sort">
            <a-input-number v-model="formData.sort" :min="0" label="排序号"></a-input-number> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item v-if="formData.type !== RouteEnum.Button" label="菜单图标：" field="icon">
            <a-input v-model="formData.icon" placeholder="菜单图标名称"></a-input> </a-form-item
        ></a-col>
      </a-row>
    </a-form>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onBeforeMount, reactive, ref } from "vue"
import type { modalInnerInfoType } from "@/components/base-modal"
import { modalMixins, useModalInner } from "@/components/base-modal"
import { MenuApi } from "@/api/upms"
import { Message } from "@arco-design/web-vue"
import { resetFormData } from "@/utils/form-data"
import { getArcoFormRef } from "@/hooks/arco"
import { RouteEnum } from "@/enums/app"
import { RouteEnumMap } from "@/constant/settings"

export default defineComponent({
  mixins: [modalMixins],
  emits: ["refreshData"],
  setup(props, context) {
    let fixSourceMenuTree = inject("fixSourceMenuTree") as Function
    let sourceFormData = {
      id: "",
      title: "",
      parentKey: null,
      parentTitle: "",
      path: "",
      sort: 0,
      icon: "",
      // lockFlag是否禁用
      key: "",
      type: 0,
      // permissions: [],
      children: undefined
    }
    let instance = getCurrentInstance()
    let formData = reactive(resetFormData({}, sourceFormData))
    let initFunction = (modalInnerInfo: modalInnerInfoType, data: typeof sourceFormData) => {
      resetFormData(formData, sourceFormData, data || {})
      formData.children = undefined
      modalInnerInfo.showModal()
      getArcoFormRef(instance).clearValidate()
    }
    let { modalInnerRegister, modalInnerInfo } = useModalInner(props, context, initFunction)
    let menuTree = ref()
    onBeforeMount(() => {
      MenuApi.get({ attachButton: true }).then(res => {
        menuTree.value = fixSourceMenuTree(res.data)
      })
    })
    const getPostData = () => {
      const res = JSON.parse(JSON.stringify(formData))
      res.children = undefined
      return res
    }
    const confirm = () => {
      getArcoFormRef(instance).validate(error => {
        if (error) return
        let postData = getPostData()
        let apiMethods: Function = MenuApi.add
        if (postData.id) {
          apiMethods = MenuApi.update
        }
        apiMethods
          .bind(MenuApi)(postData, postData.id)
          .then(() => {
            Message.success("成功")
            modalInnerInfo.closeModal()
            context.emit("refreshData")
          })
      })
    }
    return {
      modalInnerRegister,
      formData,
      RouteEnumMap,
      menuTree,
      confirm,
      RouteEnum
    }
  }
})
</script>

<style lang="less" scoped>
.menu-mng-details {
}
</style>
