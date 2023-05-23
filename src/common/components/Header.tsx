import { css, Theme, useTheme } from '@emotion/react';
import SortIcon from '@public/svg/Sort.svg';
import PlusIcon from '@public/svg/Plus.svg';
import { useAddBookmarkModal } from '@src/features/Bookmark/hooks/useAddBookmarkModal';
import { dateSortingOptionAtom } from '@src/features/Filter/atoms';
import { useAtom } from 'jotai';

const styles = {
  wrapper: (theme: Theme) => {
    return css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: theme.secondaryBackground,
      height: 60,
      padding: '0 16px 0 0',
    });
  },
  plusIcon: css({
    cursor: 'pointer',
  }),
  sortIcon: css({
    cursor: 'pointer',
    '&:hover': {},
  }),
};

const Header = () => {
  const theme = useTheme();
  const [dateSortingOption, setDateSortingOption] = useAtom(
    dateSortingOptionAtom,
  );
  const { openAddBookmarkModal } = useAddBookmarkModal();

  const onClickSorted = () => {
    if (dateSortingOption === 'newer') {
      setDateSortingOption('older');
    } else {
      setDateSortingOption('newer');
    }
  };

  return (
    <div css={styles.wrapper(theme)}>
      <div css={styles.plusIcon} onClick={openAddBookmarkModal}>
        <PlusIcon />
      </div>
      <div css={styles.sortIcon} onClick={onClickSorted}>
        <SortIcon />
      </div>
    </div>
  );
};

export default Header;
