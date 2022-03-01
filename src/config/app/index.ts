import cssVariables from "@/styles/_variables.module.less"
export interface AppConfig {
  tokenPre: string
  tokenName: string
  refreshTokenName: string
  permissionName: string
  loginPageName: string
  redirectPageName: string
  homePagePath: string
  navbarShowKey: string
  sidebarShowKey: string
  sidebarMenuCollapsedKey: string
  footerShowKey: string
  userInfoKey: string
  sysColorKey: string
  weaknessKey: string
  grayKey: string
}

const appConfig: AppConfig = {
  tokenPre: "Bearer ",
  tokenName: "access_token",
  refreshTokenName: "refresh_token",
  permissionName: "permissions",
  loginPageName: "login",
  redirectPageName: "redirect",
  homePagePath: "/main",
  navbarShowKey: "layout-nav-bar-show",
  sidebarShowKey: "layout-side-bar-show",
  sidebarMenuCollapsedKey: "layout-sidebar-menu-collapsed-",
  footerShowKey: "layout-footer-",
  userInfoKey: "user-info",
  sysColorKey: "sys-color",
  weaknessKey: cssVariables.weakNessClassName,
  grayKey: cssVariables.grayClassName
}

export default appConfig
