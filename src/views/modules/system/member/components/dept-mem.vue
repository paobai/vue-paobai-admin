<template>
  <a-spin class="total-wrapper" :loading="loading" tip="正在加载中...">
    <div class="dept-mem">
      <a-row justify="space-between">
        <a-col flex="auto">
          <a-space size="medium">
            <a-button type="outline" status="gray" @click="outputTemplateExcel">
              <template #icon> <a-icon-file /> </template>模板</a-button
            >
            <a-button type="outline" status="gray" @click="outputExcel"
              ><template #icon> <a-icon-upload /> </template>导出</a-button
            >
            <file-get-comp @getFileEvent="getFileEvent">
              <a-button type="outline" status="gray"
                ><template #icon> <a-icon-download /> </template>导入</a-button
              >
            </file-get-comp>
            <a-button type="primary" @click="addEvent"
              ><template #icon><a-icon-plus /> </template>新增人员</a-button
            >
            <a-button type="primary" status="danger" @click="deleteMems()"
              ><template #icon><a-icon-delete /></template>删除</a-button
            >
          </a-space>
        </a-col>
        <a-col flex="auto" style="text-align: right">
          <a-space size="medium">
            <a-checkbox v-model="onlySeeCurrent">仅查看本部门下人员</a-checkbox>
            <a-input v-model="keyword" placeholder="请输入关键字">
              <template #prefix>
                <a-icon-search />
              </template>
            </a-input>
          </a-space>
        </a-col>
      </a-row>
      <a-row style="flex: 1; height: 0; margin-top: 16px">
        <base-table
          v-model:selectedKeys="selectedKeys"
          :draggable="{ type: 'handle', width: 40 }"
          row-key="id"
          :data="userList"
          :row-selection="{ type: 'checkbox', showCheckedAll: true }"
          @change="TableChangeEvent">
          <template #columns>
            <a-table-column title="序号" :width="80">
              <template #cell="{ rowIndex }"> {{ rowIndex + 1 }}</template>
            </a-table-column>
            <a-table-column title="姓名" data-index="realName" :width="180"></a-table-column>
            <a-table-column title="性别" data-index="sex" :width="80">
              <template #cell="{ record }">
                <iconfont
                  v-if="record.sex === 1"
                  class="icon-a-manbeifen9"
                  style="font-size: 20px; color: #1890ff"></iconfont>
                <iconfont v-else class="icon-manbeifen" style="font-size: 20px; color: #ff6b68"></iconfont>
              </template>
            </a-table-column>
            <a-table-column title="手机号码" data-index="mobile" :width="150"></a-table-column>
            <a-table-column title="部门" data-index="deptName"></a-table-column>
            <!--          <a-table-column title="岗位" data-index="postName"></a-table-column>-->
            <!--          <a-table-column title="邮箱" data-index="email"></a-table-column>-->
            <!--          <a-table-column title="角色" data-index="administrative"></a-table-column>-->
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
    <add-or-edit-person @register="modalRegister" @refreshData="queryUserData"></add-or-edit-person>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue"
import { PersonApi } from "@/api/upms"
import { fileGetComp } from "@/components/base-upload"
import addOrEditPerson from "./add-or-edit-person.vue"
import { useModal } from "@/components/base-modal"

export default defineComponent({
  components: { fileGetComp, addOrEditPerson },
  props: {
    deptId: {
      type: [Number, String],
      default: null
    }
  },
  emits: ["refreshData"],
  setup(props) {
    let { modalRegister, modalInfo } = useModal()
    let { deptId } = toRefs(props)
    let onlySeeCurrent = ref(false)
    let keyword = ref("")
    let userList = ref<any[]>([])
    let selectedKeys = ref<AppIdType[]>([])

    let queryUserData = () => {
      let params = {
        deptId: deptId.value,
        descendant: !onlySeeCurrent.value,
        hired: true,
        keyword: keyword.value
      }
      PersonApi.get(params).then(res => {
        let data: any[] = res.data
        userList.value = data
      })
    }
    watch([onlySeeCurrent, deptId, keyword], () => {
      queryUserData()
    })
    let loading = ref(false)
    return {
      modalRegister,
      onlySeeCurrent,
      keyword,
      queryUserData,
      userList,
      selectedKeys,
      loading,
      modalInfo
    }
  },
  methods: {
    outputTemplateExcel() {
      PersonApi.downloadDeptTemp()
    },
    addEvent() {
      this.modalInfo.initFunction({ deptObj: { deptId: this.deptId } })
    },
    editEvent(item: any) {
      this.modalInfo.initFunction(item)
    },
    outputExcel() {
      PersonApi.downloadDeptFile()
    },
    deleteMems() {
      let distList = this.selectedKeys
      if (distList.length === 0) {
        this.$message.warning("请选择一项进行删除")
        return
      }
      this.$modal.warning({
        content: "是否删除所选？",
        cancelText: "取消",
        closable: true,
        hideCancel: false,
        onOk: () => {
          // item.edit = true
          PersonApi.deletePerson({ ids: distList.join(",") }).then(() => {
            this.$message.success("删除成功")
            this.queryUserData()
            this.$emit("refreshData")
          })
        }
      })
    },
    deleteEvent(item: any) {
      this.$modal.warning({
        content: "是否删除所选？",
        cancelText: "取消",
        closable: true,
        hideCancel: false,
        onOk: () => {
          // item.edit = true
          PersonApi.deletePerson({ ids: item.id }).then(() => {
            this.$message.success("删除成功")
            this.queryUserData()
            this.$emit("refreshData")
          })
        }
      })
    },
    getFileEvent(file: File) {
      const data = new FormData()
      data.append("file", file)
      this.loading = true
      PersonApi.importDeptFile(data)
        .then(() => {
          this.queryUserData()
          this.$message.success("成功")
        })
        .catch(err => {
          this.$message.error(err.msg)
        })
        .finally(() => {
          this.loading = false
        })
    },
    TableChangeEvent(userList: any[], extra: any) {
      let preUserList = this.userList
      this.userList = userList
      let personId = extra.dragTarget.id
      let prePersonId = null
      let nextPersonId = null
      let findIndex = userList.findIndex(e => e.id === personId)
      if (findIndex !== 0) prePersonId = userList[findIndex - 1].id
      if (findIndex !== userList.length - 1) nextPersonId = userList[findIndex + 1].id
      PersonApi.moveUser({
        personId,
        prePersonId,
        nextPersonId
      })
        .then(() => {
          this.$message.success("成功")
        })
        .catch(() => {
          this.$message.error("失败")
          this.userList = preUserList
        })
    }
  }
})
</script>

<style lang="less" scoped>
.dept-mem {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px 20px 0;
}
</style>
