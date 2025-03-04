import React from 'react';
import { NodeProps, Node, Position } from '@xyflow/react';
import CustomHandle from './CustomHandle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components//ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export type JobNode = Node<{
  name?: string;
  description?: string;
}>;

export default function Job(props: NodeProps<JobNode>) {
  return (
    <>
      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle>Job</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5 items-start'>
              <Label htmlFor='name'>Name</Label>
              <Input className='bg-white' id='name' placeholder='Job name' defaultValue={props.data.name} />
            </div>
            <div className='flex flex-col space-y-1.5 items-start'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                className='bg-white'
                rows={5}
                cols={30}
                id='description'
                placeholder='Description...'
                defaultValue={props.data.description}
                style={{ resize: 'none' }}
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
