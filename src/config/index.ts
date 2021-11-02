// 默认配置
import defaultConfig, { DefaultConfig } from "./default"
// 自定义配置
import customConfig, {CustomConfig} from "./custom"

let config: DefaultConfig & CustomConfig = Object.assign(
    {},
    defaultConfig,
    customConfig
)
// 导出配置（自定义配置优先级高）
export default config
