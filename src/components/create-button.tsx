'use client';

import { cn } from '@/lib/utils';
import { FC, useState } from 'react';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

interface NoteCreateButtonProps extends ButtonProps {}

const NoteCreateButton: FC<NoteCreateButtonProps> = ({ className, variant, ...props }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: 'Limit of 3 posts reached.',
          description: 'Please upgrade to the PRO plan.',
          variant: 'destructive',
        });
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not created. Please try again.',
        variant: 'destructive',
      });
    }

    const post = await response.json();

    router.refresh();

    router.push(`/editor/${post.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant: 'secondary' }),
        'rounded-full m-2 h-fit p-2',
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}>
      {isLoading ? (
        <Icons.spinner className="h-7 w-7 animate-spin" />
      ) : (
        <Icons.add className="h-7 w-7" />
      )}
    </button>
  );
};

export default NoteCreateButton;
