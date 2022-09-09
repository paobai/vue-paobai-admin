import type {
  CompValueMulti,
  CompValueSingle,
  DeptNode,
  NodeBase,
  selectValueType,
  treeMapNode,
  UserNode
} from "./interface"
import { NodeType } from "./model"

export function fixApiTreeData(treeData: any[], onlyDept = false, inTree: NodeBase[] = []) {
  treeData.forEach((node: any) => {
    if (onlyDept && checkIsUserNode(node)) return
    if (checkIsUserNode(node)) {
      buildUserNode(node)
    } else {
      buildDeptNode(node)
      const children = []
      if (node.children) children.push(...node.children)
      if (node.list) children.push(...node.list)
      node.children = fixApiTreeData(children, onlyDept)
    }
    inTree.push(node)
  })
  return inTree
}

/**
 * 给部门增加disable
 * @param inTree
 */
export function addDisableToDeptNode(inTree: NodeBase[] = []) {
  inTree.forEach(node => {
    if (!checkIsUserNode(node)) {
      node.disabled = true
      if (node.children) addDisableToDeptNode(node.children)
    }
  })
}

export function getTreeMapNode(treeData: NodeBase[], res: treeMapNode = {}): treeMapNode {
  treeData.forEach(node => {
    res[node.key] = node
    if (node.children) getTreeMapNode(node.children, res)
  })
  return res
}

/**
 * 把value转为select
 *
 */
export function loadsValueToSelectMulti(
  value: CompValueMulti,
  treeData: NodeBase[],
  treeMap: treeMapNode,
  onlyUser = false
) {
  let res = [] as unknown as selectValueType[]
  if (!value) return res
  const userList = value.userList || []
  const deptList = value.deptList || []
  userList.forEach(node => {
    res.push(buildNodeKey({ ...node, type: NodeType.USER }))
  })
  deptList.forEach(node => {
    res.push(buildNodeKey({ ...node, type: NodeType.DEPT }))
  })
  // onlyUser的话value传入的都是user，但是回显的时候需要转成dept
  if (onlyUser) {
    res = fixUserToDept(res, treeData, treeMap)
  }
  return res
}

/**
 * sourceIds
 * @param inList userIdLIST
 * @param treeDataRoot
 * @param treeMap nodeMap
 */
function fixUserToDept(inList: selectValueType[], treeDataRoot: NodeBase[], treeMap: treeMapNode) {
  const userKeys = inList.filter(item => (item + "").indexOf(NodeType.USER) === 0)
  // const deptKeys = inList.filter(item => (item + "").indexOf(NodeType.DEPT) === 0)
  const newDeptKeys: selectValueType[] = []
  const deptHadUser = new Map<string, boolean>()

  treeDataRoot.forEach(node => {
    if (checkDeptHadAllUserInList(node as DeptNode)) newDeptKeys.push(node.key)
  })
  const notInUser = new Set()
  newDeptKeys.forEach(nodeKey => {
    const deptNode = treeMap[nodeKey]
    getDeptAllUser(deptNode as DeptNode).forEach(node => notInUser.add(node.key))
  })
  const newUserKeys: selectValueType[] = userKeys.filter(userKeys => !notInUser.has(userKeys))
  function checkDeptHadAllUserInList(nodeData: DeptNode) {
    // if (deptDp.get(nodeData.key) !== undefined) return deptDp.get(nodeData.key)
    let flag = true
    const canInputDept: DeptNode[] = []
    if (nodeData.children) {
      for (let i = 0; i < nodeData.children.length; i++) {
        const getNode = nodeData.children[i]
        if (checkIsUserNode(getNode)) {
          if (!userKeys.includes(getNode.key)) {
            flag = flag && false
          }
        } else {
          if (checkDeptHadAllUserInList(getNode as DeptNode)) {
            flag = flag && true
            // 如果这个deptId里面有人那就可以选择
            checkHadUserInDept(getNode as DeptNode) && canInputDept.push(getNode as DeptNode)
          } else {
            flag = false
          }
        }
      }
      // 这个节点不成立的话
      if (!flag) newDeptKeys.push(...canInputDept.map(node => node.key))
    }
    return flag
  }
  function checkHadUserInDept(deptNode: DeptNode): boolean {
    if (deptHadUser.get(deptNode.key) !== undefined) return deptHadUser.get(deptNode.key)!
    if (!deptNode.children) return false
    let res = false
    for (let i = 0; i < deptNode.children.length; i++) {
      const getNode = deptNode.children[i]
      if (checkIsUserNode(getNode)) {
        res = true
      } else {
        res = checkHadUserInDept(getNode as DeptNode)
      }
      if (res) break
    }
    deptHadUser.set(deptNode.key, res)
    return res
  }
  return [...newUserKeys, ...newDeptKeys]
}

/**
 * 把value转为select
 */
export function loadsValueToSelectSingle(value: CompValueSingle) {
  if (!value || (!value.deptId && !value.userId)) return
  if (checkIsUserNode(value)) return buildNodeKey({ ...value, type: NodeType.USER })
  else return buildNodeKey({ ...value, type: NodeType.DEPT })
}

/**
 * dumps select to Value
 * @param select select的值
 * @param treeMapNode treeMapNode的值
 * @param onlyUser 是否输出只要user
 */
export function dumpsSelectToValueMulti(treeMapNode: treeMapNode, select: selectValueType[], onlyUser: boolean) {
  const res: CompValueMulti = {
    userList: [],
    deptList: []
  }
  select.forEach(key => {
    const getNode = treeMapNode[key]
    if (!getNode) return
    if (checkIsUserNode(getNode)) {
      res.userList.push(getNode as UserNode)
    } else {
      if (!onlyUser) res.deptList.push(getNode as DeptNode)
      // 如果输出只要user那需要吧dept 转为user
      else {
        res.userList.push(...getDeptAllUser(getNode as DeptNode))
      }
    }
  })
  return res
}

function getDeptAllUser(deptNode: DeptNode, inRes: UserNode[] = []): UserNode[] {
  if (!deptNode.children) return inRes
  deptNode.children.forEach(node => {
    if (checkIsUserNode(node)) inRes.push(node as UserNode)
    else getDeptAllUser(node as DeptNode, inRes)
  })
  return inRes
}

/**
 * dumps select to Value
 * @param select select的值
 * @param treeMapNode treeMapNode的值
 */
export function dumpsSelectToValueSingle(treeMapNode: treeMapNode, select?: selectValueType) {
  if (!select) return
  return treeMapNode[select]
}

function checkIsUserNode(node: any) {
  return node.userId
}

function buildUserNode(node: any): UserNode {
  node.type = NodeType.USER
  node.label = node.realName
  node.key = buildNodeKey(node)
  return node
}

function buildDeptNode(node: any): DeptNode {
  node.type = NodeType.DEPT
  node.label = node.deptName
  node.key = buildNodeKey(node)
  return node
}

export function buildNodeKey<T extends { type: any; deptId?: string; userId?: string; key?: string }>(node: T): string {
  if (node.type === NodeType.DEPT) return node.type + "-" + node.deptId
  else return node.type + "-" + node.userId
}
