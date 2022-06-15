import { css, Global, ThemeProvider } from '@emotion/react';
import { darkTheme } from '../styles/themes';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Global
        styles={css`
          body {
            box-sizing: border-box;
            margin: 0;
          }
        `}
      />
      {children}
    </ThemeProvider>
  );
};
