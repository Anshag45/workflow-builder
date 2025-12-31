# Workflow Builder

A visual, interactive workflow builder built using React and TypeScript that allows users to design workflows with sequential steps, conditional branching, and end states — without using any diagramming or UI libraries.

This project was built as part of a frontend assignment to demonstrate data modeling, component architecture, state management, and user experience design for complex interactive applications.

---

## Features

### Core Functionality
- Visual workflow canvas starting with a single immutable Start node
- Nodes rendered in a clear vertical flow
- Branch nodes split into True / False paths
- Editable node labels
- Automatic reconnection of workflow on node deletion

### Supported Node Types

| Node Type | Description | Outgoing Connections |
|----------|------------|---------------------|
| Start | Entry point of workflow | One |
| Action | Single task or step | One |
| Branch | Conditional decision | Two (True / False) |
| End | Terminal node | None |

---

## Interaction and Editing

- Add nodes using a contextual "+" connection menu
- Add Action, Branch, or End nodes after any non-End node
- Add steps independently to True or False branches
- Delete any node except the Start node
- Maintain continuous workflow by reconnecting parent and child nodes
- Edit node labels directly from the UI

---

## Bonus Features Implemented

### Save Workflow
- Serializes the entire workflow data structure into JSON
- Logs the JSON to the browser console
- No persistence layer used, as per assignment requirements

### Load Workflow
- Allows restoring a workflow by pasting previously saved JSON
- Fully reconstructs the workflow structure and UI

### Undo / Redo
- Supports undo and redo for structural changes such as add and delete
- Implemented using history and future state stacks

### Context-Sensitive Node Creation
- Clicking a connection point opens a small pop-over menu
- Menu allows adding Action, Branch, or End nodes
- Improves usability and keeps the UI clean

---

## Technical Design

### Data Model

The workflow is represented using a normalized structure:

{
rootId: string,
nodes: {
[id: string]: {
id: string,
type: 'start' | 'action' | 'branch' | 'end',
label: string,
next?: string | null,
branches?: {
true: string | null,
false: string | null
}
}
}
}


This structure allows:
- Efficient traversal
- Easy reconnection when nodes are deleted
- Scalable branching logic

---

### Component Architecture

| Component | Responsibility |
|---------|----------------|
| App | Global state management, save/load, undo/redo |
| Canvas | Recursive rendering of workflow |
| NodeCard | Individual node UI |
| Branch | Rendering True / False branches |
| workflowHelpers | Pure functions for state updates |

---

### State Management
- Single source of truth for workflow state
- Immutable state updates
- Undo/Redo implemented via explicit state history
- No external state management libraries used

---

## UI and UX Decisions
- No UI or diagramming libraries used, as required
- Clean CSS-based styling
- Color-coded node types for clarity
- Visual connectors to indicate workflow direction
- Minimal and intuitive user interactions

---

## Technology Stack
- React (functional components with hooks)
- TypeScript
- Vite
- CSS (no UI libraries)

---

## Constraints Followed
- No React Flow, GoJS, or diagram libraries
- No Material UI, Chakra, Shadcn, or similar UI frameworks
- No animation libraries
- Pure React and CSS implementation

---

## Running Locally



npm install
npm run dev


Open http://localhost:5173 in the browser.

---

## Testing Save and Load

1. Build a workflow using the UI
2. Click Save and copy the JSON from the console
3. Click Load and paste the copied JSON
4. The workflow should restore exactly as saved

---

## Notes
- Persistence was intentionally not implemented as per assignment instructions
- Focus was placed on correctness, scalability, and clean architecture

---

## License
This project is for evaluation purposes only.
