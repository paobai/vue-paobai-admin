import { getCurrentInstance, onMounted, reactive } from "vue"

export function useModal() {
  const modalInfo = reactive({
    modalInstance: {} as ComponentRef,
    initFunction: ((): any => {}) as Function,
    moreInfo: {} as any
  })
  const modalRegister = (modalInstance: ComponentRef, initFunction: Function, moreInfo?: any) => {
    modalInfo.modalInstance = modalInstance
    modalInfo.initFunction = initFunction
    modalInfo.moreInfo = moreInfo
  }
  return {
    modalRegister,
    modalInfo
  }
}

export type modalInnerInfoType = {
  showModal: Function
  closeModal: Function
  modalInnerInstance: ComponentRef
  moreInfo: any
}

export type initModelFunctionType = (modalInnerInfo: modalInnerInfoType, ...args: any[]) => void

export function registerModal(props: any, context: any, initModelOutFunction: Function, moreInfo?: object | any) {
  onMounted(() => {
    context.emit("register", getCurrentInstance(), initModelOutFunction, moreInfo)
  })
}

/**
 * 使用modalInner， 如果传入props context initModelFunction则自动注册（registerModal）到父组件
 * @param props
 * @param context
 * @param initModelFunction
 * @param moreInfo
 */
export function useModalInner(
  props?: any,
  context?: any,
  initModelFunction?: initModelFunctionType,
  moreInfo?: object | any
) {
  const modalInnerInfo: modalInnerInfoType = reactive({
    showModal: ((): any => {}) as Function,
    closeModal: ((): any => {}) as Function,
    modalInnerInstance: {} as ComponentRef,
    moreInfo: {} as any
  })
  const modalInnerRegister = (
    modalInnerInstance: ComponentRef,
    showModal: Function,
    closeModal: Function,
    moreInfo?: any
  ) => {
    modalInnerInfo.showModal = showModal
    modalInnerInfo.closeModal = closeModal
    modalInnerInfo.modalInnerInstance = modalInnerInstance
    modalInnerInfo.moreInfo = moreInfo
  }
  if (props && context && initModelFunction) {
    registerModal(props, context, (...arg: any[]) => initModelFunction(modalInnerInfo, ...arg), moreInfo)
  }
  return {
    modalInnerRegister,
    modalInnerInfo
  }
}
