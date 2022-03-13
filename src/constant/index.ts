import { arcoPresetColors } from "@/plugins/arco"
export enum grantType {
  PASSWORD = "password",
  REFRESH_TOKEN = "refresh_token"
}
export const clientId = "test"
export const clientSecret = "test"

export const sysColorList = Object.values(arcoPresetColors).map(colorItem => colorItem.primary)
// 这里可以增加颜色
sysColorList.push("#000000")
