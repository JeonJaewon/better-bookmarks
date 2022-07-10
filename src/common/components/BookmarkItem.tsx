import { css, Theme, useTheme } from '@emotion/react';

const styles = {
  wrapper: (theme: Theme) =>
    css({
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
};

interface BookmarkItemProps {
  title: string;
  uri: string;
  createdAt: string;
}

const BookmarkItem = ({ title, uri, createdAt }: BookmarkItemProps) => {
  const theme = useTheme();
  return (
    <a css={styles.wrapper(theme)} target="_blank" rel="noreferrer" href={uri}>
      <span>{title}</span>
      <span>{createdAt}</span>
    </a>
  );
};

export default BookmarkItem;
