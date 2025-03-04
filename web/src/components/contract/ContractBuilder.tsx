import React, { useCallback } from 'react';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Connection } from '@xyflow/react';
import Job from './Job';
import Payment from './Payment';
import CustomEdge from './CustomEdge';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  job: Job,
  payment: Payment,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { name: 'job-1' }, type: 'job' },
  { id: '2', position: { x: 400, y: 0 }, data: { name: 'job-2' }, type: 'job' },
  { id: '3', position: { x: 800, y: 0 }, data: { amount: 100 }, type: 'payment' },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, type: 'customEdge' },
  { id: 'e2-3', source: '2', target: '3', animated: true, type: 'customEdge' },
];

export function ContractBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true, id: `${edges.length + 1}`, type: 'customEdge' };
      setEdges((prevEdge) => addEdge(edge, prevEdge));
    },
    [edges.length, setEdges]
  );

  return (
    <div style={{ width: '95vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <MiniMap />
        <Background bgColor='#fafaf9' variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
