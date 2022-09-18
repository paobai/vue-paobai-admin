import baseModal from "./index.vue"
export { useModalInner, useModal, registerModal } from "./hooks/useModal"
export type { initModelFunctionType, modalInnerInfoType } from "./hooks/useModal"
export const modalMixins = {
  components: { baseModal },
  emits: ["register"]
}

export default baseModal
