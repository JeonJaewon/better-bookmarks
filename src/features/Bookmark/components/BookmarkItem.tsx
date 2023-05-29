import { css, Theme, useTheme } from '@emotion/react';
import { BookmarkItemData } from '@src/features/Bookmark/types';
import { motion } from 'framer-motion';

type BookmarkItemProps = {
  item: BookmarkItemData;
  onDrag: (e: PointerEvent) => void;
};

export const BookmarkItem = ({ item, onDrag }: BookmarkItemProps) => {
  const { title, url } = item;
  const theme = useTheme();

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
        css={styles.wrapper(theme)}
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
  wrapper: (theme: Theme) =>
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
      marginBottom: 14,
    }),
  title: css({
    fontSize: '14px',
  }),
};
