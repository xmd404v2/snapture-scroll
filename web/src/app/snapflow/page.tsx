'use client';

import { Header } from '@/components/Header';
import { ContractBuilder } from '@/components/contract/ContractBuilder';

const Snapflow = () => {
  return (
    <>
      <Header />
      <main className='container mx-auto p-4'>
        <h1 style={{ textAlign: 'center' }}>
          Snapflow &nbsp;·&nbsp; Smart Contract Builder
          <br />
          <br />
          <ContractBuilder />
        </h1>
      </main>
    </>
  );
};

export default Snapflow;
