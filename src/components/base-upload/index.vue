<template>
  <a-upload
    ref="arcoUpload"
    :show-upload-button="showUploadButton"
    :show-remove-button="canEdit"
    :custom-request="customRequest"
    :custom-icon="getCustomIcon()"
    multiple
    download
    v-bind="$attrs"
    @success="successEvent">
    <template #upload-item="data">
      <base-file-card
        :key="data.fileItem.uid"
        :edit-model="canEdit"
        class="arco-upload-list-item"
        :file-state="data.fileItem.status"
        :file-url="data.fileItem.url"
        :file-name="data.fileItem.name"
        :progress="data.fileItem.percent * 100"
        @clickDelete="() => itemDelete(data.fileItem)"></base-file-card>
      <!--      {{ JSON.stringify(data.fileItem) }}-->
    </template>
  </a-upload>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import type { FileItem, RequestOption } from "@arco-design/web-vue/es/upload/interfaces"
import { FileState } from "@/constant/settings"
import { fileUpload } from "@/api/upms"
import { Message } from "@arco-design/web-vue"
import baseFileCard from "../base-file-card.vue"

export default defineComponent({
  components: { baseFileCard },
  props: {
    requiredTypes: {
      type: String,
      default: "1,2,3,4"
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    inLineItemGap: {
      type: String,
      default: "100px"
    },
    // 单位kb
    maxFileSize: {
      type: Number,
      default: -1
    },
    deleteEvent: {
      type: Function,
      default: null
    }
  },
  emits: ["success"],
  computed: {
    showUploadButton() {
      if (!this.canEdit) return false
      else return { showOnExceedLimit: false }
    }
  },
  methods: {
    customRequest(options: RequestOption) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
      const { onProgress, onError, onSuccess, fileItem, name } = options
      const file = fileItem.file
      if (!file) return
      if (!this.checkSize(fileItem)) {
        Message.error(`文件超过大小限制。文件大小不可超过${this.maxFileSize}KB`)
        onError()
      }
      let onUploadProgress = function (progress: ProgressEvent) {
        onProgress(progress.loaded / progress.total, progress)
      }
      let data = new FormData()
      data.append("requiredTypes", this.requiredTypes)
      data.append("file", file)
      fileItem.status = FileState.UPLOADING
      return fileUpload(data, onUploadProgress)
        .then(res => {
          onSuccess(res.data)
        })
        .catch(e => {
          onError(e)
        })
        .finally(() => {})
    },
    getCustomIcon() {
      return {
        // fileIcon: (file: FileItem) => {
        //   // TODO: 根据file类型返回对应icon
        //   return h(iconfont, { class: "icon-a-yichang2x" })
        // }
      }
    },
    checkSize(file: FileItem) {
      if (this.maxFileSize === -1) return true
      return file.file!.size / 1024 <= this.maxFileSize
    },
    successEvent(fileItem: FileItem) {
      fileItem.url = fileItem.response.fullFileUrl
      this.$emit("success", fileItem)
    },
    itemDelete(fileItem: FileItem) {
      let sourceFileList = (this.$refs.arcoUpload as any).fileList as FileItem[]
      let index = sourceFileList.findIndex(e => e.uid === fileItem.uid)
      if (!this.deleteEvent) sourceFileList.splice(index, 1)
      else this.deleteEvent(index, sourceFileList[index])
    }
  }
})
</script>

<style lang="less" scoped>
.arco-upload-wrapper {
  :deep(.arco-upload-list) {
    &.arco-upload-list-type-text {
      .arco-upload-list-item:first-of-type {
        margin-top: 0;
      }
    }

    padding-top: 12px;
  }
}
</style>
