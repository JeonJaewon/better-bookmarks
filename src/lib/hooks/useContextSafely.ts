import { Context, useContext } from 'react';

export const useContextSafely = <T>(context: Context<T>): T => {
  const value = useContext(context);
  if (value === null) {
    throw new Error(`Provider of a Context not found`);
  }
  return value;
};
