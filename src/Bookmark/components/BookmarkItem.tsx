import { css, Theme, useTheme } from '@emotion/react';
import { BookmarkItemData } from '@src/Bookmark/types';
import {
  bookmarkItemHeightAtom,
  bookmarkItemMarginBottomAtom,
} from '@src/UI/atoms';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';

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
      display: 'inline-block',
      height,
      marginBottom,
    }),
  title: css({
    fontSize: '14px',
  }),
};
