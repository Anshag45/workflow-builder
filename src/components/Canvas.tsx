import { useState } from 'react'
import NodeCard from './NodeCard'
import Branch from './Branch'
import {
    addActionNode,
    addBranchNode,
    addEndNode
} from '../utils/workflowHelpers'

export default function Canvas({ nodeId, workflow, setWorkflow }: any) {
    const node = workflow.nodes[nodeId]
    const [open, setOpen] = useState(false)

    return (
        <div>
            <NodeCard node={node} workflow={workflow} setWorkflow={setWorkflow} />

            {/* CONNECTION POINT */}
            {node.type !== 'end' && (
                <div style={{ position: 'relative', marginLeft: 24 }}>
                    <button
                        onClick={() => setOpen(o => !o)}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            cursor: 'pointer'
                        }}
                    >
                        +
                    </button>

                    {open && (
                        <div
                            style={{
                                position: 'absolute',
                                background: '#fff',
                                border: '1px solid #ccc',
                                padding: 8,
                                borderRadius: 6,
                                zIndex: 10
                            }}
                        >
                            <button
                                onClick={() => {
                                    setWorkflow(addActionNode(workflow, node.id))
                                    setOpen(false)
                                }}
                            >
                                Action
                            </button>
                            <br />
                            <button
                                onClick={() => {
                                    setWorkflow(addBranchNode(workflow, node.id))
                                    setOpen(false)
                                }}
                            >
                                Branch
                            </button>
                            <br />
                            <button
                                onClick={() => {
                                    setWorkflow(addEndNode(workflow, node.id))
                                    setOpen(false)
                                }}
                            >
                                End
                            </button>
                        </div>
                    )}
                </div>
            )}

            {node.next && (
                <div className="flow-connector">
                    <Canvas
                        nodeId={node.next}
                        workflow={workflow}
                        setWorkflow={setWorkflow}
                    />
                </div>
            )}

            {node.type === 'branch' && (
                <Branch
                    nodeId={node.id}
                    branches={node.branches}
                    workflow={workflow}
                    setWorkflow={setWorkflow}
                />
            )}
        </div>
    )
}
