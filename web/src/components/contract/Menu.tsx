import { PlusIcon } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const components = [
  { type: 'job', name: 'Job' },
  { type: 'payment', name: 'Payment' },
];

export default function Menu() {
  const { setNodes } = useReactFlow();

  const onProviderClick = ({ name, type }: { name: string; type: string }) => {
    const location = Math.random() * 500;

    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${prevNodes.length + 1}`,
        data: { label: name },
        type: type,
        position: { x: location, y: location },
      },
    ]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <PlusIcon />
          Add Block
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {components.map((component) => (
          <DropdownMenuItem key={component.type} onClick={() => onProviderClick(component)}>
            {component.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
