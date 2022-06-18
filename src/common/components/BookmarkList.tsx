import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getStorageItem, STORAGE_KEYS } from '../../utils/storage';
import { useFilter } from '../contexts/FilterContext';
import BookmarkItem from './BookmarkItem';

const fixture = [
  { title: '1', uri: 'string', createdAt: dayjs('2022-01-03').toDate() },
  { title: '2', uri: 'string', createdAt: dayjs('2022-02-04').toDate() },
  { title: '3', uri: 'string', createdAt: dayjs('2022-05-13').toDate() },
  { title: '4', uri: 'string', createdAt: dayjs('2022-06-18').toDate() },
];

const BookmarkList = () => {
  const { dateSortedBy } = useFilter();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const initBookmarks = async () => {
      const localBookmarks = await getStorageItem(STORAGE_KEYS.bookmarks);
      setBookmarks(localBookmarks ?? fixture);
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
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          title={bookmark.title}
          uri=""
          createdAt={bookmark.createdAt}
        />
      ))}
    </div>
  );
};

export default BookmarkList;
