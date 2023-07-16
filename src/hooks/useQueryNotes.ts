import ky from 'ky';
import { useQuery } from '@tanstack/react-query';
import type { ClientNote } from '@/types/note';

const useQueryNotes = () => {
  return useQuery<ClientNote[]>({
    queryKey: ['notes'],
    queryFn: () => ky.get('/api/notes').json(),
  });
};

export default useQueryNotes;
