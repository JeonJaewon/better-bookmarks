import { Global, ThemeProvider } from '@emotion/react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { FilterProvider } from '@src/common/contexts/FilterContext';
import { resetCSS } from '@src/styles/globals';
import { darkTheme } from '@src/styles/themes';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <MantineProvider theme={{ colorScheme: 'dark' }}>
        <Global styles={resetCSS} />
        <ModalsProvider>
          <FilterProvider>{children}</FilterProvider>
        </ModalsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};
