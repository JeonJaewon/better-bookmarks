import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getStorageItem, STORAGE_KEYS } from '../../../utils/storage';
import { useFilter } from '../../../common/contexts/FilterContext';
import BookmarkItem from './BookmarkItem';

const BookmarkList = () => {
  const { dateSortedBy } = useFilter();
  const [bookmarks, setBookmarks] = useState([]);

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
      setBookmarks([...bookmarks].sort((a, b) => b.createdAt - a.createdAt));
    } else if (dateSortedBy === 'older') {
      setBookmarks([...bookmarks].sort((a, b) => a.createdAt - b.createdAt));
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
