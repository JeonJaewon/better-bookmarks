import { css, Theme, useTheme } from '@emotion/react';

const styles = {
  wrapper: (theme: Theme) =>
    css({
      backgroundColor: theme.secondaryBackground,
      height: 60,
    }),
};

const Header = () => {
  const theme = useTheme();
  return <div css={styles.wrapper(theme)}></div>;
};

export default Header;
