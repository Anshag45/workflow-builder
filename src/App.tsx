import { useState } from 'react'
import Canvas from './components/Canvas'
import { initialWorkflow } from './state/workflow'

export default function App() {
    const [workflow, setWorkflow] = useState(initialWorkflow)
    const [history, setHistory] = useState<any[]>([])
    const [future, setFuture] = useState<any[]>([])

    /* ===== HISTORY WRAPPER ===== */
    const commit = (newState: any) => {
        setHistory(h => [...h, workflow])
        setFuture([])
        setWorkflow(newState)
    }

    /* ===== SAVE / LOAD ===== */
    const saveWorkflow = () => {
        console.log('WORKFLOW DATA:', JSON.stringify(workflow, null, 2))
    }

    const loadWorkflow = () => {
        let json = prompt('Paste workflow JSON')
        if (!json) return

        try {
            // Handle pasted console output
            if (json.includes('WORKFLOW DATA:')) {
                json = json.slice(json.indexOf('{'))
            }

            setWorkflow(JSON.parse(json))
            setHistory([])
            setFuture([])
        } catch {
            alert('Invalid JSON')
        }
    }

    /* ===== UNDO / REDO ===== */
    const undo = () => {
        if (!history.length) return
        const prev = history[history.length - 1]
        setFuture(f => [workflow, ...f])
        setHistory(h => h.slice(0, -1))
        setWorkflow(prev)
    }

    const redo = () => {
        if (!future.length) return
        const next = future[0]
        setHistory(h => [...h, workflow])
        setFuture(f => f.slice(1))
        setWorkflow(next)
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>Workflow Builder</h1>

            <div style={{ marginBottom: 16 }}>
                <button onClick={saveWorkflow}>Save</button>
                <button onClick={loadWorkflow} style={{ marginLeft: 8 }}>
                    Load
                </button>
                <button onClick={undo} style={{ marginLeft: 8 }}>
                    Undo
                </button>
                <button onClick={redo} style={{ marginLeft: 8 }}>
                    Redo
                </button>
            </div>

            <Canvas
                nodeId={workflow.rootId}
                workflow={workflow}
                setWorkflow={commit}
            />
        </div>
    )
}
