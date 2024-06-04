'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#008DDA',
    secondary: '#41C9E2',
    tertiary: '#ACE2E1',
    travertine: '#F7EEDD',
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
