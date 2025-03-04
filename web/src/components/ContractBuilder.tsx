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
   
  const initialNodes = [
    { 
      id: 'horizontal-1',
      sourcePosition: 'right',
      type: 'input',
      data: { label: 'Job-1' },
      position: { x: 0, y: 80 }, 
    },
    { 
      id: 'horizontal-2',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Job-2' },
      position: { x: 250, y: 80 }, 
    },
    { 
      id: 'horizontal-3',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Payment' },
      position: { x: 500, y: 80 }, 
    },
  ];
  const initialEdges = [
    { 
      id: 'horizontal-e1-2',
      source: 'horizontal-1',
      target: 'horizontal-2' 
    },
    { 
      id: 'horizontal-e1-3',
      source: 'horizontal-2',
      target: 'horizontal-3' 
    },
  ];
   
  export function ContractBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   
    const onConnect = useCallback(
      (params: any) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );
   
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    );
  }