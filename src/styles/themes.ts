/* eslint-disable no-shadow */
import { Theme } from '@emotion/react';
import { grayDark } from '@radix-ui/colors';

declare module '@emotion/react' {
  export interface Theme {
    grayDark: typeof grayDark;
  }
}

export const darkTheme: Theme = {
  grayDark,
};
