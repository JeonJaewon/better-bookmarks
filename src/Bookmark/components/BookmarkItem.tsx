import { css, Theme, useTheme } from '@emotion/react';
import { BookmarkItemData } from '@src/Bookmark/types';
import {
  bookmarkItemHeightAtom,
  bookmarkItemMarginBottomAtom,
} from '@src/UI/atoms';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';

type BookmarkItemProps = {
  item: BookmarkItemData;
  onDrag: (e: PointerEvent) => void;
};

export const BookmarkItem = ({ item, onDrag }: BookmarkItemProps) => {
  const { title, url } = item;
  const theme = useTheme();
  const bookmarkItemHeight = useAtomValue(bookmarkItemHeightAtom);
  const bookmarkItemMarginBottom = useAtomValue(bookmarkItemMarginBottomAtom);

  return (
    <div key={url}>
      <motion.a
        layout
        drag
        dragSnapToOrigin
        onDrag={onDrag}
        onDragEnd={(e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
        }}
        css={styles.wrapper(
          theme,
          bookmarkItemHeight,
          bookmarkItemMarginBottom,
        )}
        target="_blank"
        rel="noreferrer"
        href={url}
      >
        <span css={styles.title}>{title}</span>
      </motion.a>
    </div>
  );
};

const styles = {
  wrapper: (theme: Theme, height: number, marginBottom: number) =>
    css({
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
