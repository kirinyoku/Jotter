import Header from '@/components/header';
import { FC, ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
export default HomeLayout;
