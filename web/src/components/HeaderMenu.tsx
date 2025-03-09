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
          {"\u00A0"}
          <MenubarMenu>
            <MenubarTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => router.push("/profile")}>
                View Profile<MenubarShortcut>Ctrl + P</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => router.push("/settings")}>
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
    </>
  );
};

export { MenuBar };
