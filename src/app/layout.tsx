import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { FC, ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import Provider from '@/components/provider';
import type { Metadata } from 'next';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-screen overflow-y-hidden bg-background antialiased')}>
        <Provider session={undefined}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
