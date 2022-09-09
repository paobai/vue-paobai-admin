<template>
  <div class="resource-mng">
    <a-space direction="vertical" size="medium">
      <a-row>资源组设置</a-row>
      <a-row>
        <a-space wrap>
          <template v-for="tag of resourceGroupList">
            <a-tag
              v-if="!tag.edit"
              :key="tag.id"
              size="large"
              checkable
              class="arco-tag-checked"
              :color="choseResourceGroup && choseResourceGroup.groupId === tag.groupId ? 'rgb(var(--primary-6))' : ''"
              @check="choseResourceGroup = tag">
              {{ tag.groupName }}
              <a-space style="margin-left: 6px">
                <a-icon-edit @click="editResourceGroup(tag)" />
                <a-icon-delete @click="deleteResourceGroup(tag)" />
              </a-space>
            </a-tag>
            <a-input-search
              v-else
              :key="tag.id"
              v-model.trim="tag.tempGroupName"
              search-button
              @keyup.enter="confirmResourceGroup(tag)"
              @blur="confirmResourceGroup(tag)">
              <template #button-icon>
                <a-icon-save @click="confirmResourceGroup(tag)" />
              </template>
            </a-input-search>
          </template>
          <a-tag
            size="large"
            :style="{
              backgroundColor: 'var(--color-fill-2)',
              border: '1px dashed var(--color-fill-3)',
              cursor: 'pointer'
            }"
            @click="addResourceGroup">
            <template #icon>
              <a-icon-plus />
            </template>
            新增
          </a-tag>
        </a-space>
      </a-row>
    </a-space>
    <div style="display: flex; flex: 1; flex-direction: column; height: 0; margin-top: 8px">
      <a-row justify="space-between">
        <a-col flex="auto"
          ><a-button type="primary" @click="addResource">
            <template #icon>
              <a-icon-plus />
            </template>
            新增权限</a-button
          ></a-col
        >
        <a-col flex="0">
          <a-space>
            <a-input v-model="searchText" style="width: 180px" placeholder="请输入关键字"></a-input>
            <a-button type="primary">
              <template #icon>
                <a-icon-search />
              </template>
              查询</a-button
            >
          </a-space>
        </a-col>
      </a-row>
      <a-row style="flex: 1 1 0; margin-top: 16px">
        <base-table :data="resourceList">
          <template #columns>
            <a-table-column title="序号" :width="120">
              <template #cell="{ rowIndex }"> {{ rowIndex + 1 }}</template>
            </a-table-column>
            <a-table-column title="资源名称" data-index="resourceName"></a-table-column>
            <a-table-column title="资源标识" data-index="permissionCode"></a-table-column>
            <a-table-column title="是否锁定" data-index="lockFlag">
              <template #cell="{ record }"> {{ record.lockFlag ? "是" : "否" }}</template>
            </a-table-column>
            <a-table-column title="排序" data-index="sort"></a-table-column>
            <a-table-column title="操作" :width="120">
              <template #cell="{ record }">
                <a-space size="medium">
                  <a-button type="outline" shape="circle" size="small" @click="editResource(record)"
                    ><a-icon-edit
                  /></a-button>
                  <a-button status="danger" type="outline" shape="circle" size="small" @click="deleteResource(record)"
                    ><a-icon-delete
                  /></a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </base-table>
      </a-row>
    </div>
    <resource-mng-details @register="modalRegister" @refreshData="refreshData"></resource-mng-details>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed, provide } from "vue"
import { ResourceApi, ResourceGroupsApi } from "@/api/upms"
import type { ResourceApiType } from "@/api/upms"
import { Message, Modal } from "@arco-design/web-vue"
import resourceMngDetails from "./resource-mng-details.vue"
import { useModal } from "@/components/base-modal"

type handleGroupItem = {
  edit: boolean
  tempGroupName: string
  resourceGroupName?: string
  sort?: number
  id?: AppIdType
} & ResourceApiType.resourceGroupItem
export default defineComponent({
  components: { resourceMngDetails },
  setup() {
    let resourceGroupList = ref<handleGroupItem[]>([])
    let choseResourceGroup = ref<Nullable<handleGroupItem>>()
    let isResourceGroupEdit = ref(false)
    let searchText = ref("")
    provide("resourceGroupList", resourceGroupList)
    let { modalRegister, modalInfo } = useModal()
    const resourceList = computed(() => {
      let res: ResourceApiType.resourceItem[] = []
      if (choseResourceGroup.value) res = choseResourceGroup.value.children
      if (searchText.value) {
        res = res.filter(e => {
          return e.resourceName.search(searchText.value) !== -1
        })
      }
      return res
    })
    let getResourceTree = () => {
      ResourceApi.get().then(res => {
        let resourceGroupListPre = res.data as handleGroupItem[]
        resourceGroupListPre.forEach(item => {
          item.edit = false
          item.tempGroupName = item.groupName
          item.children = item.children || []
          // item.children = item.children.filter(item => item.resourceName.indexOf(this.resourceFilterText) !== -1)
        })
        if (!choseResourceGroup.value) choseResourceGroup.value = resourceGroupListPre[0]
        else {
          let dist = resourceGroupListPre.filter(item => item.groupId === choseResourceGroup.value!.groupId)[0]
          if (!dist) dist = resourceGroupListPre[0]
          choseResourceGroup.value = dist
        }
        resourceGroupList.value = resourceGroupListPre
      })
    }
    const addResourceGroup = () => {
      resourceGroupList.value.push({
        tempGroupName: "",
        edit: true,
        groupId: "",
        groupName: "",
        children: []
      })
    }
    const deleteResourceGroup = (resourceGroup: handleGroupItem) => {
      let deleteFromList = () => {
        let findIndex = resourceGroupList.value.findIndex(e => e === resourceGroup)
        if (findIndex !== -1) resourceGroupList.value.splice(findIndex, 1)
      }
      if (!resourceGroup.groupId) {
        deleteFromList()
      } else {
        Modal.confirm({
          content: "确认删除？",
          onOk: () => {
            ResourceGroupsApi.delete(resourceGroup.groupId).then(() => {
              deleteFromList()
            })
          }
        })
      }
    }
    const editResourceGroup = (resourceGroup: handleGroupItem) => {
      resourceGroup.edit = true
    }
    const confirmResourceGroup = (resourceGroup: handleGroupItem) => {
      resourceGroup.resourceGroupName = resourceGroup.tempGroupName
      resourceGroup.sort = resourceGroupList.value.findIndex(e => e === resourceGroup)
      resourceGroup.id = resourceGroup.groupId
      if (!resourceGroup.groupId && !resourceGroup.tempGroupName) {
        deleteResourceGroup(resourceGroup)
        return
      }
      let apiMethods: typeof ResourceGroupsApi.add | typeof ResourceGroupsApi.update = ResourceGroupsApi.add
      if (resourceGroup.groupId) apiMethods = ResourceGroupsApi.update
      apiMethods
        .bind(ResourceGroupsApi)(resourceGroup, resourceGroup.groupId)
        .then(() => {
          resourceGroup.groupName = resourceGroup.tempGroupName
          resourceGroup.edit = false
          getResourceTree()
        })
    }
    const undoResourceGroup = (resourceGroup: handleGroupItem) => {
      resourceGroup.tempGroupName = resourceGroup.groupName
      resourceGroup.edit = false
    }
    onBeforeMount(() => {
      getResourceTree()
    })

    const addResource = () => {
      modalInfo.initFunction({ groupId: choseResourceGroup.value?.groupId })
    }
    const editResource = (item: ResourceApiType.resourceItem) => {
      modalInfo.initFunction(item)
    }
    const deleteResource = (item: ResourceApiType.resourceItem) => {
      Modal.confirm({
        content: "确认删除？",
        onOk: () => {
          ResourceApi.deleteByIds(item.id + "").then(() => {
            Message.success("删除成功")
            let findIndex = choseResourceGroup.value!.children.findIndex(e => e.id === item.id)
            choseResourceGroup.value!.children.splice(findIndex, 1)
          })
        }
      })
    }
    const refreshData = () => {
      getResourceTree()
    }
    return {
      resourceGroupList,
      choseResourceGroup,
      isResourceGroupEdit,
      addResourceGroup,
      editResourceGroup,
      confirmResourceGroup,
      undoResourceGroup,
      deleteResourceGroup,
      searchText,
      resourceList,
      modalRegister,
      addResource,
      editResource,
      refreshData,
      deleteResource
    }
  }
})
</script>

<style lang="less" scoped>
.resource-mng {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
