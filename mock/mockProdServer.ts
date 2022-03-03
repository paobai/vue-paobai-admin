import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import umps from "./upms"
import dataAnalysis from "./data-analysis"
import msBox from "./message-box"
import dashboard from "./dashboard"
import msg from "./message"
export const mockModules = [...umps, ...msBox, ...dataAnalysis, ...dashboard, ...msg]
export function setupProdMockServer() {
  createProdMockServer(mockModules)
  console.log("setupProdMockServer")
}
