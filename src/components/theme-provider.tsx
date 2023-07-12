'use client';

import { FC } from 'react';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
