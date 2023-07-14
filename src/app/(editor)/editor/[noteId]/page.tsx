import { FC } from 'react';
import { db } from '@/lib/db';
import { Note, User } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import Editor from '@/components/editor';

async function getNoteForUser(noteId: Note['id'], userId: User['id']) {
  return await db.note.findFirst({
    where: {
      id: noteId,
      authorId: userId,
    },
  });
}

interface EditorPageProps {
  params: { noteId: string };
}

const EditorPage: FC<EditorPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  console.log(params.noteId, user.id);

  const note = await getNoteForUser(params.noteId, user.id);

  if (!note) {
    notFound();
  }

  return (
    <Editor
      note={{
        id: note.id,
        title: note.title,
        content: note.content,
        isPrivate: note.isPrivate,
      }}
    />
  );
};
export default EditorPage;
