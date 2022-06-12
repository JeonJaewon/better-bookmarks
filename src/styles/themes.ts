import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primaryBackground: string;
      secondaryBackground: string;
    };
  }
}

export const darkTheme: Theme = {
  colors: {
    primaryBackground: '#1A1C1E',
    secondaryBackground: '#272A30',
  },
};
