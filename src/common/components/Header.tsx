import { css, Theme, useTheme } from '@emotion/react';
import SortIcon from '../../../public/svg/Sort.svg';
import PlusIcon from '../../../public/svg/Plus.svg';
import { useFilter, useFilterUpdate } from '../contexts/FilterContext';
import useAddBookmarkModal from '../../features/Bookmark/hooks/useAddBookmarkModal';

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
  const { dateSortedBy } = useFilter();
  const { setDateSortedBy } = useFilterUpdate();
  const { Modal, setIsOpen } = useAddBookmarkModal();

  const onClickSorted = () => {
    if (dateSortedBy === 'newer') {
      setDateSortedBy('older');
    } else {
      setDateSortedBy('newer');
    }
  };

  return (
    <div css={styles.wrapper(theme)}>
      <div css={styles.plusIcon} onClick={() => setIsOpen(true)}>
        <PlusIcon />
        <Modal />
      </div>
      <div css={styles.sortIcon} onClick={onClickSorted}>
        <SortIcon />
      </div>
    </div>
  );
};

export default Header;
