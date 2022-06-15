import { css, Global, ThemeProvider } from '@emotion/react';
import { resetCSS } from '../styles/globals';
import { darkTheme } from '../styles/themes';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Global styles={resetCSS} />
      {children}
    </ThemeProvider>
  );
};
