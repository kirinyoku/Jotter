'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface ProviderProps {
  children: ReactNode;
  session: Session | undefined;
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default Provider;
