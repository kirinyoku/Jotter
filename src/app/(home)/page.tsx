import NoteCreateButton from '@/components/create-button';
import { FC } from 'react';

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <main className="container relative h-full">
      <div className="container fixed left-[50%] translate-x-[-50%] bottom-0 flex justify-end p-4">
        <NoteCreateButton />
      </div>
    </main>
  );
};
export default Home;
