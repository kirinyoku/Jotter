import ky from 'ky';
import { Note } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const useQueryNotes = () => {
  return useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: () => ky.get('/api/notes').json(),
  });
};

export default useQueryNotes;
