// 默认配置
import appConfig from "./app"
import type { AppConfig } from "./app"
// 自定义配置
import customConfig from "./custom"
import type { CustomConfig } from "./custom"

const config: { app: AppConfig; custom: CustomConfig } = Object.assign({}, { app: appConfig, custom: customConfig })
// 导出配置（自定义配置优先级高）
export default config
