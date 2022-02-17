export interface CustomConfig {
  htmlTitle: string
  navbarShow: boolean
  sidebarShow: boolean
  sidebarMenuCollapsed: boolean
  footerShow: boolean
  sysColor: string
  weakness: boolean
  gray: boolean
}

const customConfig: CustomConfig = {
  htmlTitle: "PAOBAI-ADMIN",
  navbarShow: true,
  sidebarShow: true,
  sidebarMenuCollapsed: false,
  footerShow: true,
  sysColor: "#165DFF",
  weakness: false,
  gray: false
}

export default customConfig
