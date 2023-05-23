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

    if (nextItemIndex >= bookmarks.length) {
      return;
    }

    const ITEM_HEIGHT_FOR_SWAP = 140;
    const swapThreshold = nextItemIndex * ITEM_HEIGHT_FOR_SWAP;

    if (event.y > swapThreshold) {
      swapBookmark({ x: currentItemIndex, y: nextItemIndex });
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
