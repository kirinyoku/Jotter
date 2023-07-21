'use client';

import { FC, useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { ClientNote } from '@/types/note';
import { useSearchStore } from '@/lib/store/search';
import NoteCard from './note-card';
import useQueryNotes from '@/hooks/useQueryNotes';

const CardList: FC = () => {
  const { data: notes, isLoading } = useQueryNotes();
  const { searchedResult, setSearchedResult } = useSearchStore();

  const sortNotesByTime = (notes: ClientNote[]) => {
    return notes.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();

      return dateA - dateB;
    });
  };

  // By default, the search result is an array of notes.
  useEffect(() => {
    if (notes) {
      setSearchedResult(notes);
    }
  }, [notes]);

  return (
    <div className="grid gap-2 py-2">
      <h2 className="text-4xl font-semibold uppercase">my notes</h2>
      {isLoading ? (
        <div className="w-full flex-wrap flex justify-start items-center gap-2">
          <Skeleton className="w-80 h-28 rounded-none bg-secondary" />
          <Skeleton className="w-80 h-28 rounded-none bg-secondary" />
          <Skeleton className="w-80 h-28 rounded-none bg-secondary" />
          <Skeleton className="w-80 h-28 rounded-none bg-secondary" />
        </div>
      ) : searchedResult && searchedResult?.length > 0 ? (
        <div className="w-full flex flex-wrap justify-start items-center gap-2">
          {sortNotesByTime(searchedResult).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <>
          <h3 className="text-2xl text-center capitalize text-destructive">notes not found</h3>
        </>
      )}
    </div>
  );
};
export default CardList;
