export interface DefaultConfig {
    tokenPre: string
    tokenName: string
    refreshTokenName: string
    permissionName: string
    loginPageName: string
    NavBarShowKey: string
}

const defaultConfig: DefaultConfig = {
    tokenPre: 'Bearer ',
    tokenName: 'access_token',
    refreshTokenName: 'refresh_token',
    permissionName: 'permissions',
    loginPageName: 'login',
    NavBarShowKey: 'layout-nav-bar-show'
}

export default defaultConfig
