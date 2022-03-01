import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import umps from "./upms"
import msBox from "./message-box"
import dataAnalysis from "./data-analysis"
export const mockModules = [...umps, ...msBox, ...dataAnalysis]
export function setupProdMockServer() {
  createProdMockServer(mockModules)
  console.log("setupProdMockServer")
}
