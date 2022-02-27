import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import umps from "./upms"
import msBox from "./message-box"
export const mockModules = [...umps, ...msBox]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
  console.log("setupProdMockServer")
}
