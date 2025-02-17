// components/Header.tsx
'use client';
import Image from 'next/image';

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Link from 'next/link';
import { MenuBar } from '@/components/menu';

export function Header() {
  return (
    <header className='bg-background border-b border-border'>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <Link href='/dashboard' className='text-2xl font-bold'>
          <Image src='/snapture_black.svg' alt='Next.js logo' width={104} height={32} priority />
        </Link>
        <MenuBar />
      </div>
    </header>
  );
}
