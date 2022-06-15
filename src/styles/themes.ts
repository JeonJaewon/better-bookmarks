import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    primaryBackground: string;
    secondaryBackground: string;
    item: {
      backgroundColor: string;
    };
  }
}

export const darkTheme: Theme = {
  primaryBackground: '#1A1C1E',
  secondaryBackground: '#272A30',
  item: {
    backgroundColor: '#373A3C',
  },
};
