import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { EmptyPlaceholder } from '@/components/empty-placeholder';

const NotFound = () => {
  return (
    <main className="flex items-center min-h-screen">
      <EmptyPlaceholder className="mx-auto max-w-[800px]">
        <EmptyPlaceholder.Icon name="warning" />
        <EmptyPlaceholder.Title>
          The note you are looking for cannot be found!
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Please ask the owner of the note for an updated link.
        </EmptyPlaceholder.Description>
        <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
          Go to Home
        </Link>
      </EmptyPlaceholder>
    </main>
  );
};

export default NotFound;
