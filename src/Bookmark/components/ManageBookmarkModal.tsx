import { css } from '@emotion/react';
import { BookmarkItemData } from '@src/Bookmark/types';
import { Button } from '@mantine/core';
import { useSetAtom } from 'jotai';
import { deleteBookmarkAtom } from '@src/Bookmark/atoms';
import { closeAllModals } from '@mantine/modals';

interface Props {
  url: BookmarkItemData['url'];
}

export const ManageBookmarkModal = ({ url }: Props) => {
  const deleteBookmark = useSetAtom(deleteBookmarkAtom);
  const onClickDeleteButton = () => {
    deleteBookmark(url);
    closeAllModals();
  };

  return (
    <div css={styles.wrapper}>
      <span css={styles.urlText}>{url}</span>
      <Button
        onClick={onClickDeleteButton}
        color="red"
        css={styles.deleteButton}
      >
        Delete this Bookmark
      </Button>
    </div>
  );
};

const styles = {
  wrapper: css({ padding: '0 4px' }),
  urlText: css({
    fontSize: '14px',
  }),
  deleteButton: css({
    width: '100%',
    marginTop: '16px',
  }),
};
