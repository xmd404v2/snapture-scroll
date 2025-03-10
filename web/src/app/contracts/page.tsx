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
        {contracts.length > 0 ? (
          contracts.map((contract) => {
            const ContractBuilder = createContractBuilder(contract.nodes, contract.edges);
            return <ContractBuilder key={contract.id} />;
          })
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-semibold text-gray-700">No contracts found</h1>
            <p className="mt-2 text-gray-500">Create a new contract to get started</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Snapflow;
