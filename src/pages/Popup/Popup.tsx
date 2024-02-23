import { css, Theme, useTheme } from '@emotion/react';
import { BookmarkList } from '@src/pages/Popup/components/BookmarkList';
import { Header } from '@src/pages/Popup/components/Header';

const styles = {
  wrapper: (theme: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      width: 400,
      height: 460,
      backgroundColor: theme.grayDark.gray3,
    }),
};

export const Popup = () => {
  const theme = useTheme();
  return (
    <div css={styles.wrapper(theme)}>
      <Header />
      <BookmarkList />
    </div>
  );
};
