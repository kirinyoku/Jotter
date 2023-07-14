import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { signOut } from 'next-auth/react';
import ThemeToggle from './theme-toggle';

interface UserMenuProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | undefined | null;
  };
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const { name, email, image } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 flex justify-center items-center bg-secondary">
            {image ? (
              <AvatarImage src={image} />
            ) : (
              <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
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
  );
};
export default UserMenu;
