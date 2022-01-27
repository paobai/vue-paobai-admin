export interface CustomConfig {
    htmlTitle: string,
    navbarShow: boolean,
    sidebarShow: boolean,
    sidebarMenuCollapsed: boolean,
    footerShow: boolean,
    sysColor: string
}

const customConfig: CustomConfig = {
    htmlTitle: 'PAOBAI-ADMIN',
    navbarShow: true,
    sidebarShow: true,
    sidebarMenuCollapsed: false,
    footerShow: true,
    sysColor: '#165DFF'
}

export default customConfig
