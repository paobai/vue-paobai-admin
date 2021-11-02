export interface DefaultConfig {
    tokenPre: string
    tokenName: string
    refreshTokenName: string
    permissionName: string
}

const defaultConfig: DefaultConfig = {
    tokenPre: 'Bearer ',
    tokenName: 'access_token',
    refreshTokenName: 'refresh_token',
    permissionName: 'permissions'
}

export default defaultConfig
