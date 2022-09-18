import type { Recordable } from "vite-plugin-mock"

export type MockRequestType = {
  url: string
  body: Recordable
  query: Recordable
  headers: Recordable
}
