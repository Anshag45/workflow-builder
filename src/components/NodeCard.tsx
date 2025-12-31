import { deleteNode } from '../utils/workflowHelpers'

export default function NodeCard({ node, workflow, setWorkflow }: any) {
    return (
        <div className={`node ${node.type}`}>
            <div className="node-title">{node.type.toUpperCase()}</div>

            <input
                value={node.label}
                onChange={e =>
                    setWorkflow((wf: any) => ({
                        ...wf,
                        nodes: {
                            ...wf.nodes,
                            [node.id]: { ...node, label: e.target.value }
                        }
                    }))
                }
            />

            {node.type !== 'start' && (
                <div className="node-actions">
                    <button onClick={() => setWorkflow((wf: any) => deleteNode(wf, node.id))}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}
