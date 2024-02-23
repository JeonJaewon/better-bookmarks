import { css, Theme, useTheme } from '@emotion/react';
import { openModal } from '@mantine/modals';
import { ManageBookmarkModal } from '@src/pages/Popup/components/ManageBookmarkModal';
import { BookmarkItemData } from '@src/pages/Popup/types';
import { Colors } from '@src/styles/colors';
import { darkTheme } from '@src/styles/themes';
import {
  bookmarkItemHeightAtom,
  bookmarkItemMarginBottomAtom,
} from '@src/atoms/ui';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { MouseEvent, useRef } from 'react';
import { File, MoreHorizontal } from 'react-feather';

type BookmarkItemProps = {
  item: BookmarkItemData;
  onDrag: (e: PointerEvent) => void;
};

export const BookmarkItem = ({ item, onDrag }: BookmarkItemProps) => {
  const { title, url } = item;
  const theme = useTheme();
  const bookmarkItemHeight = useAtomValue(bookmarkItemHeightAtom);
  const bookmarkItemMarginBottom = useAtomValue(bookmarkItemMarginBottomAtom);
  const isDragging = useRef(false);
  const readableCreatedAt = dayjs(item.createdAt).format('YYYY. MM. DD');

  const handleClickItem = () => {
    if (isDragging.current) {
      return;
    }
    window.open(url);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const openManageBookmarkModal = (event: MouseEvent) => {
    openModal({
      title: 'Manage Bookmark',
      children: <ManageBookmarkModal url={url} />,
      centered: true,
    });
    event.stopPropagation();
  };

  return (
    <div key={url}>
      <motion.div
        layout
        drag
        dragSnapToOrigin
        onClick={handleClickItem}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={onDrag}
        css={styles.wrapper(
          theme,
          bookmarkItemHeight,
          bookmarkItemMarginBottom,
        )}
      >
        <File size={16} color={darkTheme.grayDark.gray12} />
        <div css={styles.contents}>
          <p css={styles.title}>{title}</p>
          <p css={styles.createdAt}>{readableCreatedAt}</p>
        </div>
        <button
          onClick={openManageBookmarkModal}
          css={styles.moreButton}
          type="button"
        >
          <MoreHorizontal color={darkTheme.grayDark.gray12} size="14" />
        </button>
      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: (theme: Theme, height: number, marginBottom: number) =>
    css({
      cursor: 'pointer',
      width: '100%',
      color: theme.grayDark.gray12,
      backgroundColor: theme.grayDark.gray6,
      borderRadius: 4,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      padding: '12px 0 12px 12px',
      justifyContent: 'space-between',
      marginBottom,
    }),
  contents: css({
    width: '80%',
    textAlign: 'left',
  }),
  title: css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '14px',
  }),
  createdAt: css({
    fontSize: '12px',
    marginTop: '4px',
    color: darkTheme.grayDark.gray10,
    marginRight: '18px',
  }),
  moreButton: css({
    cursor: 'pointer',
    width: '34px',
    backgroundColor: 'transparent',
    borderRadius: '0',
    transition: 'transform 0.1s',
    '&:hover': {
      transform: 'scale(1.25)',
    },
  }),
};
