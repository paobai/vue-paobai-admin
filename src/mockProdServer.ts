import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import umps from "../mock/upms"
export const mockModules = [...umps]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
  console.log("setupProdMockServer")
}
