declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type RefType<T> = T | null

declare type LabelValueOptions = {
  label: string
  value: any
}[]

declare type EmitType = (event: string, ...args: any[]) => void

declare type TargetContext = "_self" | "_blank"

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type ForDataType<T> = {
  [P in keyof T]?: ForDataType<T[P]>
}

declare type AnyFunction<T> = (...args: any[]) => T

declare type ExtractApiRes<T> = ReturnType<T> extends PromiseLike<infer R> ? R : any

declare type ExtractApiDataRes<T> = ExtractApiRes<T> extends { data: infer R } ? R : any

declare module '*.less' {
  const resource: {[key: string]: string};
  export = resource;
}
// 接口返回的列表数据
declare type ApiListData<T> = {
  total: number
  list: T
  [propName: string]: unknown
}