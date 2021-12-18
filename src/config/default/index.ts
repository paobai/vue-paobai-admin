export interface DefaultConfig {
    tokenPre: string
    tokenName: string
    refreshTokenName: string
    permissionName: string
    loginPageName: string
    homePagePath: string
    navbarShowKey: string
    sidebarShowKey: string
}

const defaultConfig: DefaultConfig = {
    tokenPre: 'Bearer ',
    tokenName: 'access_token',
    refreshTokenName: 'refresh_token',
    permissionName: 'permissions',
    loginPageName: 'login',
    homePagePath: '/main',
    navbarShowKey: 'layout-nav-bar-show',
    sidebarShowKey: 'layout-side-bar-show'
}

export default defaultConfig
