import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export function createContractBuilder(initialNodes, initialEdges) {
  return function ContractBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
    );

    return (
      <div
        style={{
          width: '100%',       // full width of the container
          height: '300px',     // fixed height for each contract card
          border: '1px solid #ccc',
          marginBottom: '1rem', // spacing between contracts
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    );
  };
}
