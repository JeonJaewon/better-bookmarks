import { css, Global, ThemeProvider } from '@emotion/react';
import { FilterProvider } from '../common/contexts/FilterContext';
import { resetCSS } from '../styles/globals';
import { darkTheme } from '../styles/themes';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { BookmarkProvider } from '../features/Bookmark/contexts/BookmarkContext';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <MantineProvider theme={{ colorScheme: 'dark' }}>
        <BookmarkProvider>
          <Global styles={resetCSS} />
          <ModalsProvider>
            <FilterProvider>{children}</FilterProvider>
          </ModalsProvider>
        </BookmarkProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};
