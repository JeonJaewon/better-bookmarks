import { BookmarkItemData } from '@src/Bookmark/types';
import { DateSortingOption } from '@src/Filter/atoms';
import { setStorageItem, STORAGE_KEYS } from '@src/utils/storage';
import { atom } from 'jotai';
import noop from 'lodash/noop';

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
    setStorageItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
  },
);

export const deleteBookmarkAtom = atom(null, (get, set, url: string) => {
  const deletedList = get(bookmarksAtom).filter(
    (bookmark) => bookmark.url !== url,
  );
  set(bookmarksAtom, deletedList);
  setStorageItem(STORAGE_KEYS.BOOKMARKS, deletedList);
});

export const sortBookmarkAtom = atom(
  null,
  (get, set, sortingOption: DateSortingOption) => {
    const bookmarks = get(bookmarksAtom);
    switch (sortingOption) {
      case 'newer':
        set(bookmarksAtom, [
          ...bookmarks.sort((a, b) => b.createdAt - a.createdAt),
        ]);
        return;
      case 'older':
        set(bookmarksAtom, [
          ...bookmarks.sort((a, b) => a.createdAt - b.createdAt),
        ]);
        return;
      case 'none':
      default:
        noop();
    }
  },
);
