export enum SexEnum {
  WOMAN,
  MAN
}
export enum GrantTypeEnum {
  PASSWORD = "password",
  REFRESH_TOKEN = "refresh_token"
}

export enum TokenStorageNameEnum {
  LocalStorage = "localStorage",
  SessionStorage = "sessionStorage",
  Cookie = "cookie"
}

/**
 * 菜单位置信息
 */
export enum MenuPositionEnum {
  NAVBAR = "navbar",
  SIDEBAR = "sidebar",
  MIX = "mix"
}

/**
 * route的类型
 */
export enum RouteEnum {
  Menu,
  Page,
  Iframe,
  Button
}
