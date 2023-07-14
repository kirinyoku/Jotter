'use client';

import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import UserMenu from './user-menu';

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const session = useSession();

  if (session.data?.user) {
    return (
      <header className={cn('border-b', className)} {...props}>
        <div className="flex justify-between items-center py-2 container">
          <Link href="/">
            <h1 className="text-3xl uppercase font-serif">notes</h1>
          </Link>
          <UserMenu user={session.data.user} />
        </div>
      </header>
    );
  }

  return (
    <header className={cn('border-b', className)}>
      <div className="flex justify-between items-center py-2 container">
        <h1 className="text-3xl uppercase font-serif">notes</h1>
      </div>
    </header>
  );
};
export default Header;
