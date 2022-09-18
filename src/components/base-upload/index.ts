export { default as fileGetComp } from "./file-get-comp.vue"
import baseUpload from "./index.vue"
export default baseUpload

// import { defineComponent, h } from "vue"
// import { Upload } from "@arco-design/web-vue"
// import type { RequestOption } from "@arco-design/web-vue/es/upload/interfaces"
// import { FileState } from "@/constant/settings"
// import { fileUpload } from "@/api/upms"
// export default defineComponent({
//   props: {
//     requiredTypes: {
//       type: String,
//       default: "1,2,3,4"
//     },
//     canEdit: {
//       type: Boolean,
//       default: false
//     }
//   },
//   render(ctx: any) {
//     const customRequest = (options: RequestOption) => {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
//       const { onProgress, onError, onSuccess, fileItem, name } = options
//       const file = fileItem.file
//       if (!file) return
//       // checkSize
//       // if (!this.checkSize(file)) {
//       //   this.$message.warning("文件大小超过限制需要小于" + this.limitSize + "MB")
//       //   this.$refs.fileInt.value = ""
//       //   return
//       // }
//       // return {
//       //   abort () {
//       //     xhr.abort()
//       //   }
//       // }
//       //
//       const data = new FormData()
//       data.append("requiredTypes", this.requiredTypes)
//       data.append("file", file)
//       fileItem.status = FileState.UPLOADING
//       return fileUpload(data)
//         .then(res => {
//           fileItem.url = res.data.fullFileUrl
//           fileItem.status = FileState.SUCCESS
//           onSuccess()
//         })
//         .catch(() => {
//           fileItem.status = FileState.ERROR
//           onError()
//         })
//         .finally(() => {})
//     }
//     return h(
//       Upload,
//       {
//         scroll: ctx.$props.scroll || {
//           y: "100%"
//         },
//         pagination: ctx.$props.pagination || false,
//         showUploadButton: ctx.$props.showUploadButton !== undefined ? ctx.$props.showUploadButton : this.canEdit,
//         showRemoveButton: ctx.$props.showUploadButton !== undefined ? ctx.$props.showUploadButton : this.canEdit,
//         customRequest: customRequest
//       },
//       ctx.$slots
//     )
//   }
// })
