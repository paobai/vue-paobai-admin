export interface DefaultConfig {
    tokenPre: string
    tokenName: string
    refreshTokenName: string
    permissionName: string
    loginPageName: string
    homePagePath: string
    NavBarShowKey: string
}

const defaultConfig: DefaultConfig = {
    tokenPre: 'Bearer ',
    tokenName: 'access_token',
    refreshTokenName: 'refresh_token',
    permissionName: 'permissions',
    loginPageName: 'login',
    homePagePath: '/main',
    NavBarShowKey: 'layout-nav-bar-show'
}

export default defaultConfig
