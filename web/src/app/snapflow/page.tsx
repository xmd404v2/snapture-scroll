'use client';

import { Header } from "@/components/Header";
import { createContractBuilder } from '@/components/ContractBuilder';

// Example configuration array – each object represents a contract's initial nodes and edges
const contractConfigs = [
  {
    id: 'contract1',
    nodes: [
      { id: 'horizontal-1', sourcePosition: 'right', type: 'input', data: { label: 'Job-1' }, position: { x: 0, y: 80 } },
      { id: 'horizontal-2', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Job-2' }, position: { x: 250, y: 80 } },
      { id: 'horizontal-3', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Payment' }, position: { x: 500, y: 80 } },
    ],
    edges: [
      { id: 'horizontal-e1-2', source: 'horizontal-1', target: 'horizontal-2' },
      { id: 'horizontal-e1-3', source: 'horizontal-2', target: 'horizontal-3' },
    ],
  },
  {
    id: 'contract2',
    nodes: [
      { id: 'horizontal-1', sourcePosition: 'right', type: 'input', data: { label: 'Start' }, position: { x: 0, y: 80 } },
      { id: 'horizontal-2', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Process' }, position: { x: 250, y: 80 } },
      { id: 'horizontal-3', sourcePosition: 'right', targetPosition: 'left', data: { label: 'End' }, position: { x: 500, y: 80 } },
    ],
    edges: [
      { id: 'horizontal-e1-2', source: 'horizontal-1', target: 'horizontal-2' },
      { id: 'horizontal-e2-3', source: 'horizontal-2', target: 'horizontal-3' },
    ],
  },
  {
    id: 'contract3',
    nodes: [
      { id: 'horizontal-1', sourcePosition: 'right', type: 'input', data: { label: 'Start' }, position: { x: 0, y: 80 } },
      { id: 'horizontal-2', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Process' }, position: { x: 250, y: 80 } },
      { id: 'horizontal-3', sourcePosition: 'right', targetPosition: 'left', data: { label: 'End' }, position: { x: 500, y: 80 } },
    ],
    edges: [
      { id: 'horizontal-e1-2', source: 'horizontal-1', target: 'horizontal-2' },
      { id: 'horizontal-e2-3', source: 'horizontal-2', target: 'horizontal-3' },
    ],
  },
  // Add more contract configurations as needed...
];

const Snapflow = () => {
  // return (
  //   <>
  //   <Header />
  //     <main className="container mx-auto p-4">
  //       <h1 style={{ textAlign: 'center' }}>
  //           Snapflow &nbsp;·&nbsp; Smart Contract Builder
  //           <br /><br />
  //           <ContractBuilder />
  //       </h1>
  //     </main>
  //   </>
  // );
  return (
    <>
    <Header />
    <br/>
    <h1 style={{ textAlign: 'center' }}>
     Contacts
    </h1>
    <br/>
    {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}> */}
    <main className="container mx-auto p-4">
      {contractConfigs.map((config) => {
        // Create a unique ContractBuilder for each configuration
        const ContractBuilder = createContractBuilder(config.nodes, config.edges);
        return <ContractBuilder key={config.id} />;
      })}
    </main>
    </>
  );
};

export default Snapflow;