<template>
  <div class="sk-file-card">
    <!--    <div class="img-wrapper">-->
    <!--      <img :src="getImg(fileUrl)">-->
    <!--    </div>-->
    <!--    <div class="text-wrapper">{{fileName}}</div>-->
    <!--    <div v-show="editModel" class="close-icon-wrapper" @click="clickDelete"><el-icon class="el-icon-close"></el-icon></div>-->
    <!--    <div v-show="!editModel" style="width: 28px;height: 28px;" class="download-options"  @click="downloadFile">-->
    <!--      <el-icon class="el-icon-download"></el-icon>-->
    <!--    </div>-->
    <div class="left-content" @click="leftClickEvent">
      <div class="img-wrapper">
        <img :src="getImg(fileName, fileUrl)" />
      </div>
      <div class="title text-nowrap" :class="fileState === FileState.ERROR ? 'error' : ''">
        {{ fileState === FileState.ERROR ? "上传失败-" : "" }}{{ fileName }}
      </div>
      <div v-if="uploading" class="progress-line-wrapper">
        <div class="progress-line" :style="{ width: +progress + '%' }"></div>
      </div>
    </div>
    <div v-if="editModel" class="right-option" @click="clickDelete">
      <iconfont class="icon-close"></iconfont>
    </div>
    <div v-else class="right-option" @click="downloadFile">
      <iconfont class="icon-cloud-download"></iconfont>
    </div>
  </div>
</template>

<script>
import { downloadUrl } from "@/utils/file"
import fileExcel from "@/assets/icons/file-icon/file-excel.png"
import fileImg from "@/assets/icons/file-icon/file-img.png"
import filePdf from "@/assets/icons/file-icon/file-pdf.png"
import filePpt from "@/assets/icons/file-icon/file-ppt.png"
import fileUnknown from "@/assets/icons/file-icon/file-unknown.png"
import fileWord from "@/assets/icons/file-icon/file-word.png"
import fileZip from "@/assets/icons/file-icon/file-zip.png"
import { FileState } from "@/constant/settings"

export default {
  components: {},
  props: {
    fileName: {
      type: String,
      default: ""
    },
    fileUrl: {
      type: String,
      default: ""
    },
    editModel: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 100
    },
    previewEvent: {
      type: Function,
      default: null
    },
    fileState: {
      type: String,
      default: FileState.SUCCESS
    },
    deleteEvent: {
      type: Function,
      default: null
    }
  },
  emits: ["clickDelete"],
  data() {
    let imaMapList = [
      { typeList: ["xlsx", "xls"], img: fileExcel },
      { typeList: ["png", "jpg", "jpeg", "gif", "tif", "bmp"], img: fileImg },
      { typeList: ["pdf"], img: filePdf },
      { typeList: ["ppt", "pptx"], img: filePpt },
      { typeList: ["doc", "docx"], img: fileWord },
      { typeList: ["rar", "zip", "tar"], img: fileZip },
      { typeList: ["other"], img: fileUnknown }
    ]
    let imgMap = {}
    imaMapList.forEach(e => {
      e.typeList.forEach(i => {
        imgMap[i] = e.img
      })
    })
    return {
      imgMap: imgMap,
      otherImg: fileUnknown,
      FileState,
      previewShow: false
    }
  },
  computed: {
    uploading() {
      return this.fileState === FileState.UPLOADING
    }
  },
  methods: {
    getImg(fileName, fileUrl) {
      let fileSuffix = ""
      if (fileName.indexOf(".") !== -1) fileSuffix = fileName.split(".").pop()
      else fileSuffix = fileUrl.split(".").pop()
      if (!fileSuffix) fileSuffix = fileUrl.split(".").pop()
      if (this.imgMap[fileSuffix]) return this.imgMap[fileSuffix]
      else return this.otherImg
    },
    clickDelete() {
      this.$modal.confirm({
        content: "确认删除？",
        onOk: () => {
          this.$emit("clickDelete")
        },
        onCancel: () => {
          this.$message.info("已取消删除")
        }
      })
    },
    downloadFile() {
      downloadUrl(this.fileUrl, this.fileName)
    },
    leftClickEvent() {}
  }
}
</script>

<style lang="less" scoped>
.sk-file-card {
  display: inline-flex;
  align-items: center;
  width: 336px;
  height: 60px;
  padding: 12px 8px;
  background: #f5f7fc;
  border-radius: 2px;

  .left-content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    width: 0;
    margin-right: 10px;
    cursor: pointer;

    .img-wrapper {
      width: 30px;
      height: 36px;
      margin-right: 8px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      flex: 1;
      width: 0;
      font-size: 14px;
      line-height: 22px;
      color: #344d62;

      &.error {
        color: #f54f64;
      }
    }

    .progress-line-wrapper {
      position: absolute;
      bottom: -7px;
      left: 0;
      width: 100%;
      height: 4px;
      background: #c7d5ea;
      border-radius: 2px;

      .progress-line {
        height: 100%;
        background: #538dff;
        border-radius: 2px;
        transition: width 200ms;
      }
    }
  }

  .right-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 100%;
    font-size: 14px;
    color: #8998aa;
    cursor: pointer;
    border-left: 1px solid #e6e9f5;
  }
}
</style>
<style lang="less">
.file-preview-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1002;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 50%);

  .content-view-wrapper {
    //position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    .content-view {
      display: flex;
      flex: 1;
      flex-direction: column;
      width: 0;
      max-width: 1185px;
      padding: 65px 70px 0;

      .header {
        text-align: right;

        button {
          width: 112px;
          height: 32px;
          color: #fff;
          cursor: pointer;
          background-color: #16a2ff;
          border-width: 0;
          border-radius: 4px;
        }
      }

      .file-content {
        flex: 1;
        height: 0;
        margin-top: 15px;
        background-color: #fff;
        border-radius: 2px;

        iframe {
          width: 100%;
          height: 100%;
          border-width: 0;
        }
      }
    }
  }
}
</style>
