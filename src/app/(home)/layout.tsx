import Header from '@/components/header';
import { FC, ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default HomeLayout;
