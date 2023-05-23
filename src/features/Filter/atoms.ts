import { atom } from 'jotai';

type DateSortingOption = 'none' | 'newer' | 'older';

export const dateSortingOptionAtom = atom<DateSortingOption>('none');
