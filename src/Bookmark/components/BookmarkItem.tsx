import { css, Theme, useTheme } from '@emotion/react';
import { Button } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { ManageBookmarkModal } from '@src/Bookmark/components/ManageBookmarkModal';
import { BookmarkItemData } from '@src/Bookmark/types';
import { Colors } from '@src/styles/colors';
import { darkTheme } from '@src/styles/themes';
import {
  bookmarkItemHeightAtom,
  bookmarkItemMarginBottomAtom,
} from '@src/UI/atoms';
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
        <span css={styles.title}>{title}</span>
        <Button
          onClick={openManageBookmarkModal}
          css={styles.moreButton}
          type="button"
        >
          <MoreHorizontal size="18" />
        </Button>
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
      backgroundColor: theme.grayDark.gray7,
      borderRadius: 4,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: '12px',
      justifyContent: 'space-between',
      height,
      marginBottom,
    }),
  title: css({
    padding: '14px 12px',
    flex: '1',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '88%',
    fontSize: '14px',
  }),
  moreButton: css({
    height: '100%',
    width: '50px',
    backgroundColor: 'transparent',
    borderRadius: '0',
    padding: '0 12px',
    transition: 'transform 0.2s',
    '&:hover': {
      backgroundColor: Colors.teal[300],
      transform: 'scale(1.25)',
    },
  }),
};
