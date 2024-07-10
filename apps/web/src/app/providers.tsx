'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../lib/store';

const theme = extendTheme({
  colors: {
    primary: '#008DDA',
    secondary: '#41C9E2',
    tertiary: '#ACE2E1',
    travertine: '#F7EEDD',
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
}
