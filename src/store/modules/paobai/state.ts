export enum LoginType {
  NotLogin = 0,
  HadLogin = 1
}

export interface MainState {
  userInfo: object
  loginState: LoginType
}

export const state: MainState = {
  userInfo: {},
  loginState: LoginType.NotLogin
}
