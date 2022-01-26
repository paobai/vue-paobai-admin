export interface AppConfig {
    tokenPre: string
    tokenName: string
    refreshTokenName: string
    permissionName: string
    loginPageName: string
    homePagePath: string
    navbarShowKey: string
    sidebarShowKey: string
    sidebarMenuCollapsedKey: string
    userInfoKey: string
    sysColorKey: string
}

const appConfig: AppConfig = {
    tokenPre: 'Bearer ',
    tokenName: 'access_token',
    refreshTokenName: 'refresh_token',
    permissionName: 'permissions',
    loginPageName: 'login',
    homePagePath: '/main',
    navbarShowKey: 'layout-nav-bar-show',
    sidebarShowKey: 'layout-side-bar-show',
    sidebarMenuCollapsedKey: 'layout-sidebar-menu-collapsed-',
    userInfoKey: 'userInfo',
    sysColorKey: 'sysColor'
}

export default appConfig
