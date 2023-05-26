import { atom } from 'jotai';

export type DateSortingOption = 'none' | 'newer' | 'older';

export const dateSortingOptionAtom = atom<DateSortingOption>('none');
