import { css, Theme, useTheme } from '@emotion/react';
import { openModal } from '@mantine/modals';
import { ManageBookmarkModal } from '@src/Bookmark/components/ManageBookmarkModal';
import { BookmarkItemData } from '@src/Bookmark/types';
import {
  bookmarkItemHeightAtom,
  bookmarkItemMarginBottomAtom,
} from '@src/UI/atoms';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { MouseEvent, useRef } from 'react';
import { MoreHorizontal } from 'react-feather';

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
        <span css={styles.title}>{title}</span>
        <MoreHorizontal size="18" onClick={openManageBookmarkModal} />
      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: (theme: Theme, height: number, marginBottom: number) =>
    css({
      cursor: 'pointer',
      width: '100%',
      color: '#ffffff',
      padding: '14px 12px',
      backgroundColor: theme.item.backgroundColor,
      borderRadius: 4,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-flex',
      justifyContent: 'space-between',
      height,
      marginBottom,
    }),
  title: css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '88%',
    fontSize: '14px',
  }),
};
