import { BookmarkItemData } from '@src/features/Bookmark/types';
import { atom } from 'jotai';

export const bookmarksAtom = atom<BookmarkItemData[]>([]);

export const swapBookmarkAtom = atom(
  null,
  (get, set, update: { x: number; y: number }) => {
    const bookmarks = [...get(bookmarksAtom)];
    const { x, y } = update;
    [bookmarks[x], bookmarks[y]] = [bookmarks[y], bookmarks[x]];
    set(bookmarksAtom, bookmarks);
  },
);
