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
      <header className="border-b">
        <div
          className={cn(
            'flex justify-between items-center justify-betweenw py-2 container',
            className,
          )}
          {...props}>
          <h1 className="text-3xl uppercase font-serif">notes</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
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
              <DropdownMenuContent className="w-fit mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => signOut()}>
                    <Icons.logout className="w-4 h-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn('flex justify-between items-center justify-betweenw py-4', className)}
      {...props}>
      <h1 className="text-3xl uppercase font-serif">notes</h1>
    </header>
  );
};
export default Header;
