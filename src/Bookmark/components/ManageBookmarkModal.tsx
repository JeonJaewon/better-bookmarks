import { css, Theme } from '@emotion/react';
import { BookmarkItemData } from '@src/Bookmark/types';
import { Button } from '@mantine/core';
import { useSetAtom } from 'jotai';
import { deleteBookmarkAtom } from '@src/Bookmark/atoms';
import { closeAllModals } from '@mantine/modals';
import { Link } from 'react-feather';
import { showNotification } from '@mantine/notifications';
import { Colors } from '@src/styles/colors';
import { darkTheme } from '@src/styles/themes';

interface Props {
  url: BookmarkItemData['url'];
}

export const ManageBookmarkModal = ({ url }: Props) => {
  const deleteBookmark = useSetAtom(deleteBookmarkAtom);
  const onClickDeleteButton = () => {
    deleteBookmark(url);
    closeAllModals();
  };

  const handleClickUrlSection = () => {
    navigator.clipboard.writeText(url);
    showNotification({
      message: 'Copied to clipboard',
      autoClose: 1000,
    });
  };

  return (
    <div css={styles.wrapper}>
      <div onClick={handleClickUrlSection} css={styles.urlSection}>
        <p css={styles.urlLabel}>URL</p>
        <div css={styles.urlValue}>
          <Link color={darkTheme.grayDark.gray12} size="14" />
          <p>{url}</p>
        </div>
      </div>
      <Button onClick={onClickDeleteButton} css={styles.deleteButton}>
        Delete this Bookmark
      </Button>
    </div>
  );
};

const styles = {
  wrapper: css`
    padding: 0 4px;
  `,
  urlSection: css`
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    margin: 30px 0;
  `,
  urlLabel: css`
    flex-shrink: 0;
  `,
  urlValue: (theme: Theme) => css`
    display: flex;
    gap: 6px;
    border-radius: 4px;
    padding: 10px;
    flex: 1;
    align-items: center;
    background-color: #333;
    color: ${theme.grayDark.gray12};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    & svg {
      flex-shrink: 0;
    }
    & p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `,
  deleteButton: (theme: Theme) => css`
    width: 100%;
    background-color: ${Colors.red[400]};
    color: ${theme.grayDark.gray12};
  `,
};
