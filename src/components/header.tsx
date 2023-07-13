'use client';

import { FC, HTMLAttributes } from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './theme-toggle';
import { Icons } from './icons';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {}

const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const session = useSession();

  if (session.data?.user) {
    const { name, email, image } = session.data.user;
    return (
      <header className={cn('border-b', className)} {...props}>
        <div className="flex justify-between items-center justify-betweenw py-2 container">
          <h1 className="text-3xl uppercase font-serif">notes</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {image ? (
                    <AvatarImage src={image} alt={name} />
                  ) : (
                    <AvatarFallback>{name}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <Icons.user className="w-4 h-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => signOut()}>
                  <Icons.logout className="w-4 h-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }

  return (
    <header className={cn('border-b', className)}>
      <div className="flex justify-between items-center justify-betweenw py-2 container">
        <h1 className="text-3xl uppercase font-serif">notes</h1>
      </div>
    </header>
  );
};
export default Header;
