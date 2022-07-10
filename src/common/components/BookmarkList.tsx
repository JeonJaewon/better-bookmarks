import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getStorageItem, STORAGE_KEYS } from '../../utils/storage';
import { useFilter } from '../contexts/FilterContext';
import BookmarkItem from './BookmarkItem';

const fixture = [
  {
    title: '1',
    uri: 'string',
    createdAt: dayjs('2022-01-03').format('YYYY-MM-DD'),
  },
  {
    title: '2',
    uri: 'string',
    createdAt: dayjs('2022-02-04').format('YYYY-MM-DD'),
  },
  {
    title: '3',
    uri: 'string',
    createdAt: dayjs('2022-05-13').format('YYYY-MM-DD'),
  },
  {
    title: '4',
    uri: 'string',
    createdAt: dayjs('2022-06-18').format('YYYY-MM-DD'),
  },
];

const BookmarkList = () => {
  const { dateSortedBy } = useFilter();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const initBookmarks = async () => {
      setBookmarks(fixture);
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
          uri=""
          createdAt={bookmark.createdAt}
          key={index}
        />
      ))}
    </div>
  );
};

export default BookmarkList;
