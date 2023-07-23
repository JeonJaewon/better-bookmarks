import { BookmarkItemData } from '@src/Bookmark/types';
import { atom } from 'jotai';

export const bookmarksAtom = atom<BookmarkItemData[]>([]);

export const addBookmarkAtom = atom(
  null,
  (get, set, bookmark: BookmarkItemData) => {
    const added: BookmarkItemData[] = [...get(bookmarksAtom), bookmark];
    set(bookmarksAtom, added);
  },
);

export const swapBookmarkAtom = atom(
  null,
  (get, set, update: { x: number; y: number }) => {
    const bookmarks = [...get(bookmarksAtom)];
    const { x, y } = update;
    [bookmarks[x], bookmarks[y]] = [bookmarks[y], bookmarks[x]];
    set(bookmarksAtom, bookmarks);
  },
);
