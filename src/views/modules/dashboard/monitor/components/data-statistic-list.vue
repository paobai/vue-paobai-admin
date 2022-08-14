<template>
  <div>
    <a-table
      :columns="columns"
      :data="data"
      row-key="id"
      :row-selection="{
        type: 'checkbox',
        showCheckedAll: true
      }"
      :border="false"
      :pagination="false" />
    <a-typography-text type="secondary" class="data-statistic-list-tip">
      轮播次数 {{ data.length }}
      节目单观众不可见
    </a-typography-text>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, h } from "vue"
import { Tag } from "@arco-design/web-vue"
import type { TableData, TableColumnData } from "@arco-design/web-vue/es/table/interface.d"

interface PreviewRecord {
  cover: string
  name: string
  duration: string
  id: string
  status: number
}
export default defineComponent({
  setup() {
    const data: PreviewRecord[] = [
      {
        cover:
          "http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp",
        name: "视频直播",
        duration: "00:05:19",
        id: "54e23ade",
        status: -1
      }
    ]
    const renderTag = (status: number) => {
      if (status === -1) {
        return h(Tag, { color: "red", class: "data-statistic-list-cover-tag" }, "审核未通过")
      }
      return ""
    }
    // Using the Render function is more flexible than using templates.
    // But, cannot bind context and local scopes are also lost

    const columns = computed(() => {
      return [
        {
          title: "序号",
          dataIndex: "rowIndex",
          render({ rowIndex }: { record: TableData; column: TableColumnData; rowIndex: number }) {
            return h("span", {}, rowIndex + 1)
          }
        },
        {
          title: "封面",
          dataIndex: "cover",
          render({ record }: { record: TableData; column: TableColumnData; rowIndex: number }) {
            // const tmp = `<div class='data-statistic-list-cover-wrapper'>
            //   <img src=${record.cover} />
            //   ${renderTag(record.status)}
            // </div>`;
            return h("div", { class: "data-statistic-list-cover-wrapper" }, [
              h("img", { src: record.cover }),
              renderTag(record.status)
            ])
          }
        },
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          dataIndex: "duration",
          title: "视频时长"
        },
        {
          dataIndex: "id",
          title: "视频Id"
        }
      ]
    })
    return {
      data,
      columns
    }
  }
})
</script>

<style lang="less">
// Warning: Here is the global style
.data-statistic {
  &-list {
    &-cover {
      &-wrapper {
        position: relative;
        height: 68px;

        img {
          height: 100%;
        }
      }

      &-tag {
        position: absolute;
        top: 6px;
        left: 6px;
      }
    }

    &-tip {
      display: block;
      margin-top: 16px;
      text-align: center;
    }
  }
}
</style>
