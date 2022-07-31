import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getStorageItem, STORAGE_KEYS } from '../../../utils/storage';
import { useFilter } from '../../../common/contexts/FilterContext';
import BookmarkItem from './BookmarkItem';
import {
  useBookmarkContext,
  useBookmarkUpdateContext,
} from '../contexts/BookmarkContext';
import dayjs from 'dayjs';

const BookmarkList = () => {
  const { dateSortedBy } = useFilter();
  const { bookmarks } = useBookmarkContext();
  const { setBookmarks } = useBookmarkUpdateContext();

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
      {bookmarks.map((bookmark, index) => (
        <BookmarkItem
          title={bookmark.title}
          url={bookmark.url}
          createdAt={bookmark.createdAt}
          key={index}
        />
      ))}
    </div>
  );
};

export default BookmarkList;
