import React, { useState } from 'react';
import { NodeProps, Node, Position, useReactFlow } from '@xyflow/react';
import { usePathname } from 'next/navigation';
import CustomHandle from './CustomHandle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components//ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type PaymentNode = Node<{
  id: string;
  amount?: number;
}>;

export default function Payment(props: NodeProps<PaymentNode>) {
  const { setNodes } = useReactFlow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  
  // Disable modal on the create page
  const isCreatePage = pathname?.includes('/contracts/create');

  const onAmoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              name: e.target.value,
            },
          };
        }
        return node;
      })
    );
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only open modal if not on create page
    if (isCreatePage) return;
    
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className='shadow-lg cursor-pointer' onClick={handleCardClick}>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5 items-start'>
              <Label htmlFor='amount'>Amount</Label>
              <Input 
                id='amount' 
                placeholder='100' 
                defaultValue={props.data.amount} 
                onChange={onAmoundChange} 
                onClick={(e) => e.stopPropagation()} // Prevent card click when input is clicked
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <CustomHandle type='source' position={Position.Right} />
      <CustomHandle type='target' position={Position.Left} />
    </>
  );
}
