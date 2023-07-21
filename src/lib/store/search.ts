import { create } from 'zustand';
import { ClientNote } from '@/types/note';

interface StoreState {
  searchText: string;
  searchedResult: ClientNote[];
  setSearchText: (value: string) => void;
  setSearchedResult: (notes: ClientNote[]) => void;
}

export const useSearchStore = create<StoreState>()((set) => ({
  searchText: '',
  searchedResult: [],
  setSearchText: (value) => set(() => ({ searchText: value })),
  setSearchedResult: (notes) => set(() => ({ searchedResult: notes })),
}));
