import type { FormInstance } from "@arco-design/web-vue/es/form"

export function getArcoFormRef(instance: any, key = "arcoForm"): FormInstance {
  const refs = instance.refs || instance.$refs
  return refs[key]
}
