import React from 'react';
import { NodeProps, Node, Position } from '@xyflow/react';
import CustomHandle from './CustomHandle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components//ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type PaymentNode = Node<{
  amount?: number;
}>;

export default function Payment(props: NodeProps<PaymentNode>) {
  return (
    <>
      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5 items-start'>
              <Label htmlFor='amount'>Amount</Label>
              <Input id='amount' placeholder='100' defaultValue={props.data.amount} />
            </div>
          </div>
        </CardContent>
      </Card>
      <CustomHandle type='source' position={Position.Right} />
      <CustomHandle type='target' position={Position.Left} />
    </>
  );
}
