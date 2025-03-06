'use client';

import { Header } from '@/components/Header';
import { createContractBuilder } from '@/components/ContractBuilder';

const contractConfigs = [
  {
    id: 'contract1',
    nodes: [
      { id: 'horizontal-1', sourcePosition: 'right', type: 'input', data: { label: 'Job-1' }, position: { x: 10, y: 10 } },
      { id: 'horizontal-2', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Job-2' }, position: { x: 210, y: 10 } },
      { id: 'horizontal-3', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Payment' }, position: { x: 410, y: 10 } },
    ],
    edges: [
      { id: 'horizontal-e1-2', source: 'horizontal-1', target: 'horizontal-2' },
      { id: 'horizontal-e1-3', source: 'horizontal-2', target: 'horizontal-3' },
    ],
  },
  {
    id: 'contract2',
    nodes: [
      { id: 'horizontal-1', sourcePosition: 'right', type: 'input', data: { label: 'Job-3' }, position: { x: 10, y: 10 } },
      { id: 'horizontal-2', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Job-4' }, position: { x: 210, y: 10 } },
      { id: 'horizontal-3', sourcePosition: 'right', targetPosition: 'left', data: { label: 'End' }, position: { x: 410, y: 10 } },
    ],
    edges: [
      { id: 'horizontal-e1-2', source: 'horizontal-1', target: 'horizontal-2' },
      { id: 'horizontal-e2-3', source: 'horizontal-2', target: 'horizontal-3' },
    ],
  },
  {
    id: 'contract3',
    nodes: [
      { id: 'horizontal-1', sourcePosition: 'right', type: 'input', data: { label: 'Job-5' }, position: { x: 10, y: 10 } },
      { id: 'horizontal-2', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Job-6' }, position: { x: 210, y: 10 } },
      { id: 'horizontal-3', sourcePosition: 'right', targetPosition: 'left', data: { label: 'End' }, position: { x: 410, y: 10 } },
    ],
    edges: [
      { id: 'horizontal-e1-2', source: 'horizontal-1', target: 'horizontal-2' },
      { id: 'horizontal-e2-3', source: 'horizontal-2', target: 'horizontal-3' },
    ],
  },
];

const Snapflow = () => {
  return (
    <>
      <br />
      <h1 style={{ textAlign: 'center' }}>Contacts</h1>
      <br />
      <main className='container mx-auto p-4'>
        {contractConfigs.map((config) => {
          const ContractBuilder = createContractBuilder(config.nodes, config.edges);
          return <ContractBuilder key={config.id} />;
        })}
      </main>
    </>
  );
};

export default Snapflow;
