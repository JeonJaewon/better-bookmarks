import { css, Theme, useTheme } from '@emotion/react';
import Header from '../../common/components/Header';

const styles = {
  main: (theme: Theme) =>
    css({
      width: 400,
      height: 460,
      backgroundColor: theme.colors.primaryBackground,
    }),
};

const Popup = () => {
  const theme = useTheme();
  return (
    <div css={styles.main(theme)}>
      <Header />
    </div>
  );
};

export default Popup;
