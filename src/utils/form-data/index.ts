import { cloneDeep } from "lodash"
export const resetFormData = <T extends object>(formData: T | object, sourceFormData: T, moreInfo?: T): T => {
  return Object.assign(formData, cloneDeep(sourceFormData), cloneDeep(moreInfo))
}
