import cssVariables from "@/styles/_variables.module.less"
export interface AppConfig {
  appApiTokenName: string
  tokenPre: string
  tokenName: string
  refreshTokenName: string
  permissionName: string
  loginPageName: string
  redirectPageName: string
  homePagePath: string
  userInfoKey: string
  weaknessKey: string
  grayKey: string
}

const appConfig: AppConfig = {
  appApiTokenName: "PAOBAI-ID",
  tokenPre: "Bearer ",
  tokenName: "access_token",
  refreshTokenName: "refresh_token",
  permissionName: "permissions",
  loginPageName: "login",
  redirectPageName: "redirect",
  homePagePath: "/home",
  userInfoKey: "user-info",
  weaknessKey: cssVariables.weakNessClassName,
  grayKey: cssVariables.grayClassName
}

export default appConfig
