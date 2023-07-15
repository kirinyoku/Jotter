'use client';

import { FC } from 'react';
import { Note } from '@prisma/client';
import { Skeleton } from './ui/skeleton';
import NoteCard from './note-card';
import useQueryNotes from '@/hooks/useQueryNotes';

const CardList: FC = () => {
  const { data: notes, isLoading } = useQueryNotes();

  const sortArrayByUpdateTime = (array: Note[]) => {
    return array.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();

      return dateA - dateB;
    });
  };

  return (
    <div className="grid gap-2 py-2">
      {!isLoading && notes ? (
        <>
          {sortArrayByUpdateTime(notes).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </>
      ) : (
        <>
          <Skeleton className="w-full h-20 rounded-none" />
          <Skeleton className="w-full h-20 rounded-none" />
          <Skeleton className="w-full h-20 rounded-none" />
        </>
      )}
    </div>
  );
};
export default CardList;
