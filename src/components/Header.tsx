// components/Header.tsx
"use client";
import Image from "next/image";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"



import Link from "next/link";
import { MenuBar } from "./MenuBar";

export function Header() {
  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          <Image
            className="dak:invert"
            src="/snapture_logo.svg"
            alt="Next.js logo"
            width={104}
            height={32}
            priority
          />
        </Link>
        <MenuBar />
      </div>
    </header>
  );
}
