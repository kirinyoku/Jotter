'use client';

import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { useSearchStore } from '@/lib/store/search';
import { ChangeEvent, FC, HTMLAttributes, useState } from 'react';
import useQueryNotes from '@/hooks/useQueryNotes';

interface SearchProps extends HTMLAttributes<HTMLInputElement> {}

const Search: FC<SearchProps> = ({ className, ...props }) => {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  const { data: notes, isLoading } = useQueryNotes();
  const { searchText, setSearchText, setSearchedResult } = useSearchStore();

  const filterNotes = (searchText: string) => {
    const regExp = new RegExp(searchText, 'i');
    if (!isLoading && notes) {
      return notes.filter((note) => regExp.test(note.title));
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterNotes(event.target.value);
        if (searchResult) {
          setSearchedResult(searchResult);
        }
      }, 500),
    );
  };

  return (
    <Input
      type="text"
      placeholder="Search for a note by title..."
      value={searchText}
      onChange={handleSearch}
      className={cn(className, 'after:content-[hi]')}
      {...props}
    />
  );
};

export default Search;
