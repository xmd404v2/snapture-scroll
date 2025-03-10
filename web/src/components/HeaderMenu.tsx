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

const MenuBar = () => {
  const router = useRouter();
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
        </Menubar>
      </nav>
    </>
  );
};

export { MenuBar };
