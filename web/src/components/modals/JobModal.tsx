import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAccount } from 'wagmi';
import { EvmChains, OnChainClientOptions, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';

import { useEthersSigner } from '@/app/hooks/useEthersSigner';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { pinata } from '@/pinata';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name?: string;
    description?: string;
    id?: string;
    workflowAddress?: string;
  };
}

interface Workflow {
  address: string;
  tokenUri: string;
}

const JobModal = ({ isOpen, onClose, data }: JobModalProps) => {
  const signer = useEthersSigner();
  const { address, chainId } = useAccount();
  const [signClient, setSignClient] = useState<SignProtocolClient>();
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [file, setFile] = useState<string | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TODO: change chain based on chainId
    const newClient = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.scrollSepolia,
    } as OnChainClientOptions);

    setSignClient(newClient);
  }, [address, chainId, signer]);

  const handleApprove = async () => {
    if (!signClient || !data.workflowAddress) return;
    try {
      setIsApproving(true);

      // Nft metadata
      const metadata = {
        name: data.name || '',
        description: data.description || '',
        image: `https://ipfs.io/ipfs/${file}`,
        attributes: [
          {
            trait_type: 'Workflow Address',
            value: data.workflowAddress,
          },
        ],
      };
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], `${file}.json`);
      const urlRequest = await fetch('/api/pinata');
      const urlResponse = await urlRequest.json();
      const upload = await pinata.upload.public.file(metadataFile).url(urlResponse.url);
      const metadataCid = upload.cid;

      const attestationData = {
        workflow_address: data.workflowAddress,
        token_uri: `https://ipfs.io/ipfs/${metadataCid}`,
      };
      const schemaId = process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID;
      const attestation = await signClient.createAttestation({
        schemaId: schemaId!,
        data: attestationData,
        indexingValue: signer!.address,
      });

      console.log('Attestation created:', attestation);
    } catch (error) {
      console.error('Error creating attestation:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);

      const file = event.target.files?.[0];
      if (file) {
        const urlRequest = await fetch('/api/pinata');
        const urlResponse = await urlRequest.json();
        const upload = await pinata.upload.public.file(file).url(urlResponse.url);
        setFile(upload.cid);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className='bg-[#FFFFFF] p-4 rounded-lg shadow-lg max-w-[95vw] max-h-[95vh] w-[600px] flex flex-col'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-black text-xl font-semibold'>Job Details</h2>
              <Button onClick={onClose} variant='ghost'>
                ✖
              </Button>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto [&_label]:text-black'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Job Name</Label>
                  <Input id='name' value={data.name || ''} readOnly className='bg-gray-100' />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea id='description' value={data.description || ''} readOnly className='bg-gray-100 min-h-[100px]' />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='status'>Status</Label>
                  <div className='px-3 py-2 bg-amber-100 text-amber-800 rounded-md font-medium'>Pending</div>
                </div>

                {file && (
                  <div className='space-y-2'>
                    <Label htmlFor='status'>Files</Label>

                    <div className='font-medium'>
                      <Link href={`https://ipfs.io/ipfs/${file}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                        {file}
                      </Link>
                    </div>
                  </div>
                )}

                <div className='space-y-2'>
                  <Label>Actions</Label>
                  <div className='flex gap-2'>
                    <input type='file' ref={hiddenFileInput} onInputCapture={handleChange} style={{ display: 'none' }} />
                    <Button className='bg-blue-600 hover:bg-blue-700' onClick={() => hiddenFileInput.current?.click()} disabled={isUploading}>
                      {isUploading ? (
                        <>
                          <Loader2 className='animate-spin' />
                          Uploading
                        </>
                      ) : (
                        <>Upload Files</>
                      )}
                    </Button>

                    <Button className='bg-green-600 hover:bg-green-700' onClick={handleApprove} disabled={isApproving}>
                      {isApproving && <Loader2 className='animate-spin' />}Approve
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className='pt-4 mt-4 border-t flex justify-end'>
              <Button onClick={onClose} className='bg-neutral-900'>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;
