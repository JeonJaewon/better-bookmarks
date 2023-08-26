import { BookmarkItemData } from '@src/Bookmark/types';
import { atom, PrimitiveAtom } from 'jotai';

export const draggingBookmarkItemAtom = atom<BookmarkItemData | undefined>(
  undefined,
) as PrimitiveAtom<BookmarkItemData | undefined>;
