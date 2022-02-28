import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
// import { MockMethod } from "vite-plugin-mock"
import umps from "./upms"
import msBox from "./message-box"
export const mockModules = [...umps, ...msBox]
// mockModules.forEach(item => {
//   ;(item as MockMethod).timeout = 1000
// })

export function setupProdMockServer() {
  createProdMockServer(mockModules)
  console.log("setupProdMockServer")
}
