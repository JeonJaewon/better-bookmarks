import { css, Theme, useTheme } from '@emotion/react';

const styles = {
  wrapper: (theme: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      backgroundColor: theme.item.backgroundColor,
      height: 50,
      marginBottom: 24,
      borderRadius: 10,
    }),
};

interface BookmarkItemProps {
  title: string;
  uri: string;
  createdAt: Date;
}

const BookmarkItem = ({ title, uri, createdAt }: BookmarkItemProps) => {
  const theme = useTheme();
  return (
    <div css={styles.wrapper(theme)}>
      <a target="_blank" rel="noreferrer" href={uri}>
        {title}
      </a>
    </div>
  );
};

export default BookmarkItem;
