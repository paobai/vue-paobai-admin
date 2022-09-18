<template>
  <div class="role normal-layout-content">
    <div class="role-wrapper">
      <a-row justify="space-between">
        <a-col flex="auto">
          <a-button type="primary" @click="addEvent">
            <template #icon>
              <a-icon-plus />
            </template>
            新增</a-button
          >
        </a-col>
        <a-col flex="auto" style="text-align: right">
          <a-space size="medium">
            <a-input v-model="queryParams.keyword" placeholder="请输入关键字">
              <template #prefix>
                <a-icon-search />
              </template>
            </a-input>
            <a-button type="primary" @click="queryRoleList">查询</a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-row style="flex: 1; height: 0; margin-top: 16px; overflow-y: auto">
        <base-table :data="roleList">
          <template #columns>
            <a-table-column title="序号" :width="120">
              <template #cell="{ rowIndex }"> {{ rowIndex + 1 }}</template>
            </a-table-column>
            <a-table-column title="角色名称" data-index="roleName" :width="250"></a-table-column>
            <a-table-column title="角色编码" data-index="roleCode" :width="250"></a-table-column>
            <a-table-column title="角色描述" data-index="description"></a-table-column>
            <a-table-column title="操作" :width="150" align="center">
              <template #cell="{ record }">
                <a-space size="medium">
                  <a-button type="outline" shape="circle" size="small" @click="editEvent(record)"
                    ><a-icon-edit
                  /></a-button>
                  <a-button status="danger" type="outline" shape="circle" size="small" @click="deleteEvent(record)"
                    ><a-icon-delete
                  /></a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </base-table>
      </a-row>
    </div>
    <add-or-edit @register="modalRegister" @refreshData="queryRoleList"></add-or-edit>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, ref } from "vue"
import { RoleApi } from "@/api/upms"
import type { RoleApiType } from "@/api/upms"
import addOrEdit from "./add-or-edit.vue"
import { useModal } from "@/components/base-modal"
import { Message } from "@arco-design/web-vue"
import ArcoModal from "@arco-design/web-vue/es/modal"
export default defineComponent({
  components: { addOrEdit },
  setup() {
    let queryParams = reactive({
      keyword: ""
    })
    let roleList = ref<RoleApiType.roleItem[]>([])
    let queryRoleList = () => {
      RoleApi.getList(queryParams).then(res => {
        roleList.value = res.data as RoleApiType.roleItem[]
      })
    }
    let { modalRegister, modalInfo } = useModal()
    let addEvent = () => {
      modalInfo.initFunction()
    }
    let editEvent = (record: any) => {
      modalInfo.initFunction(record)
    }
    let deleteEvent = (record: { id: any }) => {
      ArcoModal.confirm({
        content: "确认删除？",
        onOk: () => {
          RoleApi.delete(record.id).then(() => {
            Message.success("成功")
            queryRoleList()
          })
        }
      })
    }
    onBeforeMount(() => {
      queryRoleList()
    })
    return {
      queryParams,
      roleList,
      editEvent,
      modalRegister,
      queryRoleList,
      deleteEvent,
      addEvent
    }
  }
})
</script>

<style lang="less" scoped>
.role {
  .role-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
</style>
