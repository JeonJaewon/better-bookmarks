/* eslint-disable no-shadow */
import { Theme } from '@emotion/react';
import { blueDark, grayDark } from '@radix-ui/colors';

declare module '@emotion/react' {
  export interface Theme {
    grayDark: typeof grayDark;
    blueDark: typeof blueDark;
  }
}

export const darkTheme: Theme = {
  grayDark,
  blueDark,
};
