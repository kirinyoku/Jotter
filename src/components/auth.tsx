'use client';

import { Icons } from './icons';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { buttonVariants } from './ui/button';
import { FC, HTMLAttributes, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface AuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const AuthForm: FC<AuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to Notes</h1>
      </div>
      <div className={cn('grid gap-4', className)} {...props}>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              please sign in with github
            </span>
          </div>
        </div>
        <button
          type="button"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          onClick={() => {
            setIsLoading(true);
            signIn('github', { callbackUrl });
          }}
          disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{' '}
          GitHub
        </button>
      </div>
    </div>
  );
};
export default AuthForm;
