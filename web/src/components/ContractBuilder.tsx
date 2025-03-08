import React from 'react';
import { ReactFlow, Background } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export function createContractBuilder(nodes: Node[], edges: Edge[]) {
  return function ContractBuilder() {
    return (
      <div
        style={{
          width: '100%', // full width of the container
          height: '60px', // fixed height for each contract card
          backgroundColor: '#fafaf9',
          marginBottom: '1rem', // spacing between contracts
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          draggable={false}
          panOnDrag={false}
          edgesFocusable={false}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
        ></ReactFlow>
      </div>
    );
  };
}
