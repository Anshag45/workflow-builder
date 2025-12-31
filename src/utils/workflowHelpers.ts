import { WorkflowState, WorkflowNode } from '../state/workflow'

const uid = () => Math.random().toString(36).slice(2)

/* ACTION NODE */
export function addActionNode(
    state: WorkflowState,
    parentId: string
): WorkflowState {
  const id = uid()
  const parent = state.nodes[parentId]

  const node: WorkflowNode = {
    id,
    type: 'action',
    label: 'New Action',
    next: parent.next ?? null
  }

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [id]: node,
      [parentId]: { ...parent, next: id }
    }
  }
}

/* BRANCH NODE */
export function addBranchNode(
    state: WorkflowState,
    parentId: string
): WorkflowState {
  const id = uid()
  const parent = state.nodes[parentId]

  const node: WorkflowNode = {
    id,
    type: 'branch',
    label: 'Condition',
    branches: {
      true: null,
      false: null
    }
  }

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [id]: node,
      [parentId]: { ...parent, next: id }
    }
  }
}

/* END NODE */
export function addEndNode(
    state: WorkflowState,
    parentId: string
): WorkflowState {
  const id = uid()
  const parent = state.nodes[parentId]

  const node: WorkflowNode = {
    id,
    type: 'end',
    label: 'End'
  }

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [id]: node,
      [parentId]: { ...parent, next: id }
    }
  }
}

/* ADD NODE TO BRANCH */
export function addNodeToBranch(
    state: WorkflowState,
    branchId: string,
    key: 'true' | 'false'
): WorkflowState {
  const id = uid()
  const branch = state.nodes[branchId]

  const node: WorkflowNode = {
    id,
    type: 'action',
    label: 'New Action',
    next: branch.branches?.[key] ?? null
  }

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [id]: node,
      [branchId]: {
        ...branch,
        branches: { ...branch.branches, [key]: id }
      }
    }
  }
}

/* DELETE NODE */
export function deleteNode(
    state: WorkflowState,
    nodeId: string
): WorkflowState {
  if (nodeId === state.rootId) return state

  const nodes = { ...state.nodes }
  const node = nodes[nodeId]

  const parent = Object.values(nodes).find(
      n =>
          n.next === nodeId ||
          (n.branches && Object.values(n.branches).includes(nodeId))
  )

  if (parent?.next === nodeId) {
    parent.next = node.next ?? null
  }

  if (parent?.branches) {
    for (const k in parent.branches) {
      if (parent.branches[k as 'true' | 'false'] === nodeId) {
        parent.branches[k as 'true' | 'false'] = null
      }
    }
  }

  delete nodes[nodeId]
  return { ...state, nodes }
}
