import Canvas from './Canvas'
import { addNodeToBranch } from '../utils/workflowHelpers'

export default function Branch({ nodeId, branches, workflow, setWorkflow }: any) {
    return (
        <div className="branch-container">
            {Object.entries(branches).map(([key, child]: any) => (
                <div key={key} className="branch-column">
                    <strong>{key.toUpperCase()}</strong>

                    {child ? (
                        <Canvas
                            nodeId={child}
                            workflow={workflow}
                            setWorkflow={setWorkflow}
                        />
                    ) : (
                        <button
                            onClick={() =>
                                setWorkflow((wf: any) =>
                                    addNodeToBranch(wf, nodeId, key)
                                )
                            }
                        >
                            + Add Step
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}
