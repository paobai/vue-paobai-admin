import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import umps from "./upms"
import dataAnalysis from "./data-analysis"
import msBox from "./message-box"
import dashboard from "./dashboard"
import msg from "./message"
import file from "./file"
import Mock from "mockjs"
export const mockModules = [...umps, ...msBox, ...dataAnalysis, ...dashboard, ...msg, ...file]
export function setupProdMockServer() {
  createProdMockServer(mockModules)
  Mock.setup({
    timeout: "300-500"
  })
  console.log("setupProdMockServer")
}
