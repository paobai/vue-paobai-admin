import type { Recordable } from "vite-plugin-mock"
import { ApiCodeEnum } from "@/utils/http-request/help"

export type MockRequestType = {
  url: string
  body: Recordable
  query: Recordable
  headers: Recordable
}

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false) {
    setup()
  }
}

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: "ok",
    msg: "请求成功",
    code: ApiCodeEnum.SUCCESS
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = ApiCodeEnum.FAILED) => {
  return {
    data,
    status: "fail",
    msg,
    code
  }
}
