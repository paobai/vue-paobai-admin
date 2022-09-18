import { defineComponent, h } from "vue"
import { Table } from "@arco-design/web-vue"

export default defineComponent({
  render(ctx: any) {
    return h(
      Table,
      {
        ref: "arcoTable",
        scroll: ctx.$props.scroll || {
          y: "100%"
        },
        pagination: ctx.$props.pagination || false
      },
      ctx.$slots
    )
  }
})
