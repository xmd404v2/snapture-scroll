import React, { useState, useCallback } from 'react';
import { ReactFlow, Background, Node, Edge, NodeMouseHandler } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export function createContractBuilder(nodes: Node[], edges: Edge[], disableModal: boolean = false) {
  return function ContractBuilder() {
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
      // If modal is disabled, do nothing on click
      if (disableModal) return;
      
      event.preventDefault();
      setSelectedNode(node);
      setIsModalOpen(true);
    }, [disableModal]);

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedNode(null);
    };

    // Determine the mode based on the node type or data
    const getModalMode = () => {
      if (!selectedNode) return undefined;
      
      // Check node type or data properties to determine if it's a job or payment
      const nodeType = selectedNode.type || '';
      const nodeData = selectedNode.data || {};
      
      if (nodeType.toLowerCase().includes('job')) {
        return 'job';
      } else if (nodeType.toLowerCase().includes('payment')) {
        return 'payment';
      }
      
      // Check if data has a type property
      const dataType = typeof nodeData.type === 'string' ? nodeData.type : '';
      if (dataType.toLowerCase().includes('job')) {
        return 'job';
      } else if (dataType.toLowerCase().includes('payment')) {
        return 'payment';
      }
      
      // Fall back to checking if node has payment-specific data
      if (nodeData.amount !== undefined) {
        return 'payment';
      }
      
      // Default to job if nothing matches
      return 'job';
    };

    // Get initial data for the modal
    const getInitialData = (): Partial<FormItems> => {
      if (!selectedNode || !selectedNode.data) return {};
      
      const nodeData = selectedNode.data;
      
      if (getModalMode() === 'job') {
        return {
          jobName: String(nodeData.name || nodeData.label || ''),
          jobDescription: String(nodeData.description || ''),
          jobType: 'Job'
        };
      } else if (getModalMode() === 'payment') {
        return {
          contractAmount: Number(nodeData.amount || 0),
          jobType: 'Payment'
        };
      }
      
      return {};
    };

    return (
      <div
        style={{
          width: '100%', // full width of the container
          height: '200px', // increased height to make nodes more visible
          backgroundColor: '#fafaf9',
          marginBottom: '1rem', // spacing between contracts
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          draggable={false}
          panOnDrag={true}
          edgesFocusable={false}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={true}
          zoomOnScroll={true}
          zoomOnDoubleClick={false}
          onNodeClick={onNodeClick}
          fitView={true}
          minZoom={0.5}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
          className="react-flow-container"
          style={{ background: '#fafaf9' }}
        >
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    );
  };
}
