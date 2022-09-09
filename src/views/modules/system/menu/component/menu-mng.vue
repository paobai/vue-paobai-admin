<template>
  <div class="menu-mng">
    <a-row>
      <a-col flex="auto">
        <a-button type="primary" @click="addMenu">
          <template #icon>
            <a-icon-plus></a-icon-plus>
          </template>
          新增菜单
        </a-button>
      </a-col>
      <a-col flex="auto"> </a-col>
    </a-row>
    <div style="flex: 1; height: 0; margin-top: 16px">
      <base-table :data="menuTree" row-key="id">
        <template #columns>
          <!--          <a-table-column title="序号" data-index="name" :width="100">-->
          <!--            <template #cell="{ rowIndex }"> {{ rowIndex + 1 }}</template>-->
          <!--          </a-table-column>-->
          <a-table-column title="名称" data-index="menuName" :width="300"></a-table-column>
          <a-table-column title="锁定" data-index="lockFlag">
            <template #cell="{ record }">
              {{ record.lockFlag ? "是" : "否" }}
            </template>
          </a-table-column>
          <a-table-column title="图标" data-index="icon">
            <template #cell="{ record }">
              <template v-if="record.icon">
                <icon-svg :name="record.icon" size="18"></icon-svg>
              </template>
              <template v-else>
                {{ record.icon }}
              </template>
            </template>
          </a-table-column>
          <a-table-column title="类型" data-index="type">
            <template #cell="{ record }">
              {{ record.type === 0 ? "菜单" : record.type === 1 ? "页面" : "按钮" }}
            </template>
          </a-table-column>
          <a-table-column title="排序号" data-index="sort"></a-table-column>
          <a-table-column title="菜单路由" data-index="path"></a-table-column>
          <!--          <a-table-column title="keepAlive" data-index="keepAlive">-->
          <!--            <template #cell="{ record }">-->
          <!--              {{ record.keepAlive ? "是" : "否" }}-->
          <!--            </template>-->
          <!--          </a-table-column>-->
          <a-table-column title="操作" :width="150">
            <template #cell="{ record }">
              <a-space size="medium">
                <a-button v-if="!record.rootNode" type="outline" shape="circle" size="small" @click="editMenu(record)"
                  ><a-icon-edit
                /></a-button>
                <a-button type="outline" shape="circle" size="small" @click="addMenu({ parentId: record.id })"
                  ><a-icon-plus
                /></a-button>
                <a-button
                  v-if="!record.rootNode"
                  status="danger"
                  type="outline"
                  shape="circle"
                  size="small"
                  @click="deleteMenu(record.id)"
                  ><a-icon-delete
                /></a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </base-table>
    </div>
    <menu-mgn-details @register="modalRegister" @refreshData="refreshData"></menu-mgn-details>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, provide } from "vue"
import { MenuApi } from "@/api/upms"
import type { RouterApiType } from "@/constant/settings"
import { useModal } from "@/components/base-modal"
import menuMgnDetails from "./menu-mng-details.vue"
import { Modal, Message } from "@arco-design/web-vue"

type menuType = Partial<RouterApiType> & { terminal: AppIdType; rootNode?: boolean }

export default defineComponent({
  components: { menuMgnDetails },
  setup() {
    let menuTree = ref<menuType[]>([])
    let { modalRegister, modalInfo } = useModal()
    const fixSourceMenuTree = (sourceData: ExtractApiDataRes<typeof MenuApi.get>) => {
      let result: menuType[] = []
      sourceData.forEach(item => {
        result.push({
          id: "root-" + item.terminal,
          rootNode: true,
          children: item.menuTree,
          terminal: item.terminal,
          menuName: item.terminalDescription
        })
      })
      return result
    }
    const refreshData = () => {
      MenuApi.get().then(res => {
        menuTree.value = fixSourceMenuTree(res.data)
      })
    }
    const addMenu = (menu: menuType) => {
      modalInfo.initFunction(menu)
    }
    const editMenu = (menu: menuType) => {
      if (menu && menu.parentId === "0") {
        if (menu.terminal === "1") menu.parentId = "root-1"
        else menu.parentId = "root-2"
      }
      modalInfo.initFunction(menu)
    }
    const deleteMenu = (id: AppIdType) => {
      Modal.confirm({
        content: "确认删除？",
        onOk: () => {
          MenuApi.deleteMenu({ ids: id }).then(() => {
            refreshData()
            Message.success("删除成功")
          })
        }
      })
    }
    provide("fixSourceMenuTree", fixSourceMenuTree)
    onBeforeMount(() => {
      refreshData()
    })
    return {
      menuTree,
      modalRegister,
      addMenu,
      editMenu,
      deleteMenu,
      refreshData
    }
  }
})
</script>

<style lang="less" scoped>
.menu-mng {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
