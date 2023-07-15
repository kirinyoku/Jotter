import ky from 'ky';
import { useMutation } from '@tanstack/react-query';

const useMutationDeleteNote = () => {
  return useMutation({
    mutationKey: ['notes', 'delete'],
    mutationFn: (noteId: string) => ky.delete(`/api/notes/${noteId}`).json(),
  });
};

export default useMutationDeleteNote;
