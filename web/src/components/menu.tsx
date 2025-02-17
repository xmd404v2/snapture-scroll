"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateNewProject from "./forms/createProject/CreateNewProject";

const MenuBar = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => setIsModalOpen(prev => !prev), []);

  return (
    <>
      <nav>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Projects</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={toggleModal}>
                Create New<MenubarShortcut>Ctrl + N</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Manage Existing<MenubarShortcut>Ctrl + M</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Reports</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                View All<MenubarShortcut>Ctrl + R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Analyze Tool<MenubarShortcut>Ctrl + A</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          {"\u00A0"}
          <MenubarMenu>
            <MenubarTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                View Profile<MenubarShortcut>Ctrl + P</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Settings<MenubarShortcut>Ctrl + S</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => router.push("/auth/login")}>
                Logout
              </MenubarItem>
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
