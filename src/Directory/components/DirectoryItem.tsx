import { Folder } from 'react-feather';
import { css, Theme, useTheme } from '@emotion/react';

export const DirectoryItem = () => {
  const theme = useTheme();
  return (
    <div id="directory" className="directory" css={styles.wrapper(theme)}>
      <Folder size={20} color="white" />
    </div>
  );
};

const styles = {
  wrapper: (theme: Theme) =>
    css({
      backgroundColor: theme.item.backgroundColor,
      width: '100%',
      borderRadius: 4,
      height: '180px',
      marginBottom: '20px',
    }),
};
