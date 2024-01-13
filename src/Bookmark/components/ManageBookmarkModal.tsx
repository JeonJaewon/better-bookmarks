import { css } from '@emotion/react';
import { BookmarkItemData } from '@src/Bookmark/types';
import { Button } from '@mantine/core';
import { useSetAtom } from 'jotai';
import { deleteBookmarkAtom } from '@src/Bookmark/atoms';
import { closeAllModals } from '@mantine/modals';
import { Link } from 'react-feather';
import { showNotification } from '@mantine/notifications';

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
      <div
        onClick={() => {
          navigator.clipboard.writeText(url);
          showNotification({
            message: 'Copied to clipboard',
            autoClose: 1000,
          });
        }}
        css={styles.urlSection}
      >
        <Link color="#FFFFFF" size="18" />
        <span>{url}</span>
      </div>

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
  wrapper: css`
    padding: 0 4px;
    color: #fff;
    width: 100%;
  `,
  urlSection: css`
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    font-size: 14px;
    background-color: #333;
    margin-top: 4px;
    padding: 12px;
    color: #fff;

    & span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `,
  deleteButton: css`
    width: 100%;
    margin-top: 16px;
    background-color: #f00;
    color: #fff;
  `,
};
