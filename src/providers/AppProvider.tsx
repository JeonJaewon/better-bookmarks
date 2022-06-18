import { css, Global, ThemeProvider } from '@emotion/react';
import { FilterProvider } from '../common/contexts/FilterContext';
import { resetCSS } from '../styles/globals';
import { darkTheme } from '../styles/themes';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Global styles={resetCSS} />
      <FilterProvider>{children}</FilterProvider>
    </ThemeProvider>
  );
};
