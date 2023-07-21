'use client';

import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { siteConfig } from '@/config/site';
import { FC, HTMLAttributes } from 'react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import UserMenu from './user-menu';
import Search from './search';

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const session = useSession();

  if (session.data?.user) {
    return (
      <header className={cn('border-b', className)} {...props}>
        <div className="flex justify-between items-center py-2 container">
          <Link href="/" className="flex gap-2 items-center">
            <Icons.logo />
            <h1 className="hidden md:block text-3xl uppercase font-serif">{siteConfig.name}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Search />
            <UserMenu user={session.data.user} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn('border-b', className)}>
      <div className="flex justify-between items-center py-2 container">
        <h1 className="text-3xl uppercase font-serif">{siteConfig.name}</h1>
      </div>
    </header>
  );
};
export default Header;
