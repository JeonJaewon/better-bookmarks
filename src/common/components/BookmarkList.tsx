import { css } from '@emotion/react';
import BookmarkItem from './BookmarkItem';

const BookmarkList = () => {
  const temporary = [1, 2, 3, 4, 5, 6, 7];
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
      {temporary.map(() => (
        <BookmarkItem title="a" uri="" createdAt={new Date()} />
      ))}
    </div>
  );
};

export default BookmarkList;
