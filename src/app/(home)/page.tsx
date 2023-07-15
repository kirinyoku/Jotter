import { FC } from 'react';
import CardList from '@/components/card-list';
import NoteCreateButton from '@/components/create-button';

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <main className="container h-full">
      <CardList />
      <div className="container fixed z-10 bottom-0 left-[50%] translate-x-[-50%] flex justify-end items-center mx-auto py-4">
        <NoteCreateButton />
      </div>
    </main>
  );
};
export default Home;
