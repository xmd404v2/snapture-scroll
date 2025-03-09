'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreateNewProject from './forms/createProject/CreateNewProject';

const MenuBar = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

  return (
    <>
      <nav>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Contracts</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => router.push('/contracts/create')}>
                Create New<MenubarShortcut>Ctrl + N</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => router.push('/contracts')}>
                Manage Existing<MenubarShortcut>Ctrl + M</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Reports</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => router.push('/reports')}>
                View All<MenubarShortcut>Ctrl + R</MenubarShortcut>
              </MenubarItem>
              {/* <MenubarItem onClick={() => router.push('/reports/analyze')}> 
                Analyze Tool<MenubarShortcut>Ctrl + A</MenubarShortcut>
              </MenubarItem> */}
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Agent</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => router.push('/chat')}>
                Chat<MenubarShortcut>Ctrl + C</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          {'\u00A0'}
          <MenubarMenu>
            <MenubarTrigger>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => router.push('/profile')}>
                View Profile<MenubarShortcut>Ctrl + P</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => router.push('/settings')}>
                Settings<MenubarShortcut>Ctrl + S</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => router.push('/auth/login')}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </nav>

      {/* Modal: Create New Project */}
      {isModalOpen && <CreateNewProject isOpen={isModalOpen} onClose={toggleModal} />}
    </>
  );
};

export { MenuBar };
