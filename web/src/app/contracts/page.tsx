'use client';

import { useRouter } from 'next/navigation';
import { createContractBuilder } from '@/components/ContractBuilder';
import { Button } from '@/components/ui/button';
import { useContractStore } from '@/store/ContractStore';

const Snapflow = () => {
  const router = useRouter();
  const contracts = useContractStore((state) => state.contracts);

  return (
    <>
      <br />
      <div className='container flex justify-between'>
        <h1 className='text-xl font-semibold tracking-tight'>Contracts</h1>
        <Button size='sm' onClick={() => router.push('/contracts/create')}>
          Create Contract
        </Button>
      </div>

      <br />
      <main className='container mx-auto p-4'>
        {contracts.map((contract) => {
          const ContractBuilder = createContractBuilder(contract.nodes, contract.edges);
          return <ContractBuilder key={contract.id} />;
        })}
      </main>
    </>
  );
};

export default Snapflow;
