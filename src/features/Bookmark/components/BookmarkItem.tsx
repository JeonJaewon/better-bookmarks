import { css, Theme, useTheme } from '@emotion/react';
import { BookmarkItemData } from '@src/features/Bookmark/types';
import { motion } from 'framer-motion';

type BookmarkItemProps = BookmarkItemData & {
  onDrag: (e: PointerEvent) => void;
};

export const BookmarkItem = ({
  title,
  url,
  createdAt,
  onDrag,
}: BookmarkItemProps) => {
  const theme = useTheme();

  return (
    <div key={url}>
      <motion.a
        layout
        drag
        dragSnapToOrigin
        onDrag={onDrag}
        css={styles.wrapper(theme)}
        target="_blank"
        rel="noreferrer"
        href={url}
      >
        <span css={styles.title}>{title}</span>
        <span css={styles.createdAt}>{createdAt}</span>
      </motion.a>
    </div>
  );
};

const styles = {
  wrapper: (theme: Theme) =>
    css({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#ffffff',
      justifyContent: 'space-between',
      padding: '0 12px',
      backgroundColor: theme.item.backgroundColor,
      height: 50,
      marginBottom: 24,
      borderRadius: 10,
    }),
  title: css({
    fontSize: '14px',
    fontWeight: 'bold',
  }),
  createdAt: css({
    width: '100px',
    display: 'inline-block',
  }),
};
