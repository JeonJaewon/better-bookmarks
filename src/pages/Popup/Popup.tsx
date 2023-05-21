import { css, Theme, useTheme } from '@emotion/react';
import { BookmarkList } from '@src/features/Bookmark/components/BookmarkList';
import Header from '@src/common/components/Header';

const styles = {
  wrapper: (theme: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      width: 400,
      height: 460,
      backgroundColor: theme.primaryBackground,
    }),
};

const Popup = () => {
  const theme = useTheme();
  return (
    <div css={styles.wrapper(theme)}>
      <Header />
      <BookmarkList />
    </div>
  );
};

export default Popup;
