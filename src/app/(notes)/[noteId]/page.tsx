import { FC } from 'react';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { Note } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import Editor from '@/components/editor';

async function getNoteById(noteId: Note['id']) {
  return await db.note.findFirst({
    where: {
      id: noteId,
    },
  });
}

interface NotePageProps {
  params: { noteId: string };
}

const NotePage: FC<NotePageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  const note = await getNoteById(params.noteId);

  if (!note) {
    notFound();
  }

  /*If the note is private and the user of the session is 
  not its author, it returns a message about denied access. */
  if (note.isPrivate && user?.id !== note.authorId) {
    return (
      <main className="h-screen">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="h-full flex flex-col justify-center items-center gap-2 text-center pb-24">
          <p className="text-4xl">Access denied</p>
          <h2 className="text-xl">This note is private</h2>
        </div>
      </main>
    );
  }

  return (
    <Editor
      note={{
        id: note.id,
        title: note.title,
        content: note.content,
        isPrivate: note.isPrivate,
        authorId: note.authorId,
      }}
    />
  );
};
export default NotePage;
