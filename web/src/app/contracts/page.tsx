'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Loader2 } from 'lucide-react';
import { EvmChains, OnChainClientOptions, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';

import { createContractBuilder } from '@/components/ContractBuilder';
import { Button } from '@/components/ui/button';
import { useContractStore } from '@/store/ContractStore';
import { useEthersSigner } from '@/app/hooks/useEthersSigner';

interface Workflow {
  address: string;
  tokenUri: string;
}

const Snapflow = () => {
  const router = useRouter();
  const contracts = useContractStore((state) => state.contracts);
  const signer = useEthersSigner();
  const { address, chainId } = useAccount();
  const [signClient, setSignClient] = useState<SignProtocolClient>();
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [workflow, setWorkflow] = useState<Workflow>();

  useEffect(() => {
    // TODO: change chain based on chainId
    const newClient = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.scrollSepolia,
    } as OnChainClientOptions);

    setSignClient(newClient);
  }, [address, chainId, signer]);

  const handleApprove = async (workflow?: Workflow) => {
    if (!signClient || !workflow) return;
    try {
      setIsApproving(true);

      const attestationData = {
        workflow_address: workflow.address,
        token_uri: workflow.tokenUri,
      };
      const schemaId = process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID;
      const attestation = await signClient.createAttestation({
        schemaId: schemaId!,
        data: attestationData,
        indexingValue: schemaId!,
      });

      console.log('Attestation created:', attestation);
    } catch (error) {
      console.error('Error creating attestation:', error);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <>
      <br />
      <div className='container flex justify-between'>
        <h1 className='text-xl font-semibold tracking-tight'>Contracts</h1>
        <Button size='sm' onClick={() => router.push('/contracts/create')}>
          Create Contract
        </Button>
        <Button size='sm' onClick={() => handleApprove(workflow)} disabled={isApproving}>
          {isApproving && <Loader2 className='animate-spin' />}Approve
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
