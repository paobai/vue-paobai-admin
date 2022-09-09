<template>
  <base-modal width="690px" title="菜单" class="task-settings" @register="modalInnerRegister" @ok="confirm">
    <a-form ref="arcoForm" :model="formData" :inline="true" auto-label-width>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单名称：" field="menuName" :rules="[{ required: true, message: '请输入' }]">
            <a-input v-model="formData.menuName"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12"
          ><a-form-item label="菜单标识：" field="menuKey"> <a-input v-model="formData.menuKey"></a-input> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="上级菜单：" field="parentName">
            <a-tree-select
              v-model="formData.parentId"
              :data="menuTree"
              :field-names="{
                key: 'id',
                title: 'menuName',
                children: 'children',
                icon: 'icon2'
              }"></a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="12"
          ><a-form-item label="菜单路由：" field="path"> <a-input v-model="formData.path"></a-input> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="终端设备类型：" field="terminal">
            <a-select v-model="formData.terminal" disabled>
              <a-option v-for="item in terminalType" :key="item.value" :value="item.value" :label="item.name">
              </a-option>
            </a-select> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="菜单类型：" field="type">
            <a-select v-model="formData.type">
              <a-option v-for="item in menuType" :key="item.value" :value="item.value" :label="item.name"> </a-option>
            </a-select> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item label="是否锁定：" field="lockFlag">
            <a-radio-group v-model="formData.lockFlag" style="width: 220px">
              <a-radio :value="false">否</a-radio>
              <a-radio :value="true">是</a-radio>
            </a-radio-group>
          </a-form-item></a-col
        >
        <a-col :span="12"
          ><a-form-item label="排序号：" field="sort">
            <a-input-number v-model="formData.sort" :min="0" label="排序号"></a-input-number> </a-form-item
        ></a-col>
        <a-col :span="12"
          ><a-form-item v-if="formData.type !== 2" label="菜单图标：" field="icon">
            <a-input v-model="formData.icon" placeholder="菜单图标名称"></a-input> </a-form-item
        ></a-col>
        <a-col :span="24">
          <a-form-item field="permissions" label="资源权限：">
            <a-tree
              v-model:checked-keys="formData.permissions"
              :checkable="true"
              :data="resourceList"
              checked-strategy="child"
              :field-names="{
                key: 'key',
                title: 'label',
                children: 'children'
              }" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeMount, inject, getCurrentInstance } from "vue"
import { useModalInner, modalMixins } from "@/components/base-modal"
import type { modalInnerInfoType } from "@/components/base-modal"
import { MenuApi, ResourceApi } from "@/api/upms"
import { Message } from "@arco-design/web-vue"
import { resetFormData } from "@/utils/form-data"
import { getArcoFormRef } from "@/hooks/arco"

export default defineComponent({
  mixins: [modalMixins],
  emits: ["refreshData"],
  setup(props, context) {
    let fixSourceMenuTree = inject("fixSourceMenuTree") as Function
    let sourceFormData = {
      id: "",
      menuName: "",
      parentId: null,
      parentName: "",
      path: "",
      sort: 0,
      icon: "",
      keepAlive: true,
      // lockFlag是否禁用
      lockFlag: false,
      menuKey: "",
      terminal: "1",
      type: 0,
      permissions: [],
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
    const terminalType = [
      { name: "PC端", value: "1" },
      { name: "手机", value: "2" }
    ]
    const menuType = [
      { name: "菜单", value: 0 },
      { name: "页面", value: 1 },
      { name: "按钮", value: 2 }
    ]
    let menuTree = ref()
    let resourceList = ref()
    const getResourceList = () => {
      ResourceApi.get().then(res => {
        let resourceGroupList = res.data
        resourceGroupList.forEach((item: any) => {
          item.key = "group-" + item.groupId
          item.label = item.groupName
          item.children.forEach((e: any) => {
            e.key = e.permissionCode
            e.label = e.resourceName
          })
          resourceList.value = resourceGroupList
        })
      })
    }
    onBeforeMount(() => {
      MenuApi.get().then(res => {
        menuTree.value = fixSourceMenuTree(res.data)
      })
      getResourceList()
    })
    const getPostData = () => {
      let result = JSON.parse(JSON.stringify(formData))
      if (result.parentId && result.parentId.indexOf("root-") === 0) {
        result.parentId = null
      }
      result.permissions = result.permissions.filter((e: string) => {
        return e.indexOf("group-") !== 0
      })
      return result
    }
    const confirm = () => {
      getArcoFormRef(instance).validate(error => {
        if (error) return
        let postData = getPostData()
        let apiMethods: Function = MenuApi.add
        if (formData.id) {
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
      terminalType,
      menuType,
      menuTree,
      confirm,
      resourceList
    }
  }
})
</script>

<style lang="less" scoped>
.menu-mng-details {
}
</style>
