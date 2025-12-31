export type NodeType = 'start' | 'action' | 'branch' | 'end'

export interface WorkflowNode {
  id: string
  type: NodeType
  label: string
  next?: string | null
  branches?: {
    true: string | null
    false: string | null
  }
}

export interface WorkflowState {
  rootId: string
  nodes: Record<string, WorkflowNode>
}

export const initialWorkflow: WorkflowState = {
  rootId: 'start',
  nodes: {
    start: {
      id: 'start',
      type: 'start',
      label: 'Start',
      next: null
    }
  }
}
