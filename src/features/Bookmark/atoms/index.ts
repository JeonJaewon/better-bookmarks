import { BookmarkItemData } from '@src/features/Bookmark/types';
import { atom } from 'jotai';

export const bookmarksAtom = atom<BookmarkItemData[]>([]);
