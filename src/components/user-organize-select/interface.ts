export type NodeTypeValue = "dept" | "user"
/**
 * NodeBase
 */
export type NodeBase = {
  key: any
  label: any
  children?: NodeBase[]
  type?: NodeTypeValue
  disabled?: boolean
  [k: string]: any
}
/**
 * userNode
 */
export type UserNode = {
  userId: any
  deptId: any
  realName?: string
} & NodeBase
/**
 * userNode
 */
export type DeptNode = {
  deptId: any
  deptName?: string
} & NodeBase
/**
 * CompValueMulti
 */
export type CompValueMulti = {
  userList: { userId: any; [k: string]: any }[]
  deptList: { deptId: any; [k: string]: any }[]
}
/**
 * CompValueMulti
 */
export type CompValueSingle = {
  userId?: string
  deptId?: string
  [k: string]: any
}

/**
 * selectValueType
 */
export type selectValueType = string | number

/**
 * treeMapNode
 */
/**
 * fix api tree
 * @param treeData
 * @param inTree
 */
export type treeMapNode = { [k: selectValueType]: NodeBase }
