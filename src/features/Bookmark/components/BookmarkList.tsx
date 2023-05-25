import { css } from '@emotion/react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getStorageItem, STORAGE_KEYS } from '@src/utils/storage';
import { BookmarkItem } from '@src/features/Bookmark/components/BookmarkItem';
import { useAtom, useSetAtom } from 'jotai';
import { bookmarksAtom, swapBookmarkAtom } from '@src/features/Bookmark/atoms';
import { dateSortingOptionAtom } from '@src/features/Filter/atoms';

export const BookmarkList = () => {
  const [dateSortingOption] = useAtom(dateSortingOptionAtom);
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const swapBookmark = useSetAtom(swapBookmarkAtom);

  useEffect(() => {
    const initBookmarks = async () => {
      // chrome.storage.sync.clear();
      const currentList = (await getStorageItem(STORAGE_KEYS.bookmarks)) ?? [];
      setBookmarks(currentList);
    };

    initBookmarks();
  }, []);

  useEffect(() => {
    if (dateSortingOption === 'newer') {
      setBookmarks(
        [...bookmarks].sort(
          (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
        ),
      );
      return;
    }

    if (dateSortingOption === 'older') {
      setBookmarks(
        [...bookmarks].sort(
          (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
        ),
      );
    }
  }, [dateSortingOption]);

  const onDrag = (currentItemIndex: number) => (event: PointerEvent) => {
    const nextItemIndex = currentItemIndex + 1;
    const swapWithNextThreshold = nextItemIndex * 140;

    if (event.y > swapWithNextThreshold) {
      if (nextItemIndex >= bookmarks.length) {
        return;
      }
      swapBookmark({ x: currentItemIndex, y: nextItemIndex });
      return;
    }

    const previousItemIndex = currentItemIndex - 1;
    const swapWithPreviousThreshold = nextItemIndex * 70;
    if (event.y < swapWithPreviousThreshold) {
      if (previousItemIndex < 0) {
        return;
      }
      swapBookmark({ x: currentItemIndex, y: previousItemIndex });
    }
  };

  return (
    <div css={styles.wrapper}>
      <ol>
        {bookmarks.map((item, index) => (
          <BookmarkItem
            key={`${item.url}-${item.createdAt}`}
            item={item}
            onDrag={onDrag(index)}
          />
        ))}
      </ol>
    </div>
  );
};

const styles = {
  wrapper: css`
    overflow: scroll;
    padding: 24px;
    height: 400px;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
