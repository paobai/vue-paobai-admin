export namespace ResourceApiType {
  export type resourceItem = {
    groupId: AppIdType
    id: AppIdType
    lockFlag: boolean
    permissionCode: string
    resourceName: string
    sort?: number
  }
  export type resourceGroupItem = {
    children: resourceItem[]
    groupId: AppIdType
    groupName: string
  }
}
