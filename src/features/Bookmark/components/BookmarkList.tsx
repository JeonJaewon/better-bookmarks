import { css } from '@emotion/react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getStorageItem, STORAGE_KEYS } from '@src/utils/storage';
import { useFilter } from '@src/common/contexts/FilterContext';
import { BookmarkItem } from '@src/features/Bookmark/components/BookmarkItem';
import {
  useBookmarkContext,
  useBookmarkUpdateContext,
} from '@src/features/Bookmark/contexts/BookmarkContext';

export const BookmarkList = () => {
  const { dateSortedBy } = useFilter();
  const { bookmarks } = useBookmarkContext();
  const { setBookmarks } = useBookmarkUpdateContext();

  const swapBookmark = (a: number, b: number) => {
    const result = [...bookmarks];
    [result[a], result[b]] = [result[b], result[a]];
    setBookmarks(result);
  };

  useEffect(() => {
    const initBookmarks = async () => {
      // chrome.storage.sync.clear();
      const currentList = await getStorageItem(STORAGE_KEYS.bookmarks);
      setBookmarks(currentList ?? []);
    };
    initBookmarks();
  }, []);

  useEffect(() => {
    if (dateSortedBy === 'newer') {
      setBookmarks(
        [...bookmarks].sort(
          (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
        ),
      );
    } else if (dateSortedBy === 'older') {
      setBookmarks(
        [...bookmarks].sort(
          (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
        ),
      );
    }
  }, [dateSortedBy]);

  const onDrag = (index: number) => (e: PointerEvent) => {
    const ITEM_HEIGHT = 70;
    if (e.y > (index + 1) * ITEM_HEIGHT * 2) {
      if (index + 1 >= bookmarks.length) {
        return;
      }
      swapBookmark(index, index + 1);
    }
  };

  return (
    <div
      css={css`
        overflow: scroll;
        padding: 24px;
        height: 400px;
        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <ol>
        {bookmarks.map((bookmark, index) => (
          <BookmarkItem
            title={bookmark.title}
            url={bookmark.url}
            createdAt={bookmark.createdAt}
            key={bookmark.title}
            onDrag={onDrag(index)}
          />
        ))}
      </ol>
    </div>
  );
};
