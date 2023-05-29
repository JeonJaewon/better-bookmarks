import { css } from '@emotion/react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { getStorageItem, STORAGE_KEYS } from '@src/utils/storage';
import { BookmarkItem } from '@src/Bookmark/components/BookmarkItem';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { bookmarksAtom, swapBookmarkAtom } from '@src/Bookmark/atoms';
import { dateSortingOptionAtom } from '@src/Filter/atoms';
import { useCalculateSwapThreshold } from '@src/Bookmark/hooks/useCalculateSwapThreshold';
import { bookmarkListPaddingTopAtom } from '@src/UI/atoms';

export const BookmarkList = () => {
  const [dateSortingOption] = useAtom(dateSortingOptionAtom);
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const swapBookmark = useSetAtom(swapBookmarkAtom);
  const calculateSwapThreshold = useCalculateSwapThreshold();
  const bookmarkListPaddingTop = useAtomValue(bookmarkListPaddingTopAtom);

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
    const swapWithNextThreshold = calculateSwapThreshold(
      currentItemIndex,
      'DOWN',
    );
    if (event.y > swapWithNextThreshold) {
      if (nextItemIndex >= bookmarks.length) {
        return;
      }
      swapBookmark({ x: currentItemIndex, y: nextItemIndex });
      return;
    }

    const previousItemIndex = currentItemIndex - 1;
    const swapWithPreviousThreshold = calculateSwapThreshold(
      currentItemIndex,
      'UP',
    );
    if (event.y < swapWithPreviousThreshold) {
      if (previousItemIndex < 0) {
        return;
      }
      swapBookmark({ x: currentItemIndex, y: previousItemIndex });
    }
  };

  return (
    <div css={styles.wrapper(bookmarkListPaddingTop)}>
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
  wrapper: (paddingTop: number) => css`
    overflow: scroll;
    padding: 24px;
    height: 400px;
    padding-top: ${paddingTop};
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
