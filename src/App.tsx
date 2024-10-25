import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  // useNodesState,
  // useEdgesState,
  applyEdgeChanges,
  applyNodeChanges,
  type OnConnect,
  NodeChange,
  Edge,
  EdgeChange,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { AppNode } from './nodes/types';


export default function App() {
  // This version allows us to add and remove edges
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  const onNodesChange = useCallback(
    (changes: NodeChange<AppNode>[]) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [],
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((edges) => applyEdgeChanges(changes, edges)),
    [],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  )
}

// Default app code
// export default function App() {
//   const [nodes, , onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const onConnect: OnConnect = useCallback(
//     (connection) => setEdges((edges) => addEdge(connection, edges)),
//     [setEdges]
//   );

//   return (
//     <ReactFlow
//       nodes={nodes}
//       nodeTypes={nodeTypes}
//       onNodesChange={onNodesChange}
//       edges={edges}
//       edgeTypes={edgeTypes}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       fitView
//     >
//       <Background />
//       <MiniMap />
//       <Controls />
//     </ReactFlow>
//   );
// }
