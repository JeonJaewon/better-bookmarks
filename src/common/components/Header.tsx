import { css, Theme, useTheme } from '@emotion/react';
import SortIcon from '../../../public/svg/Sort.svg';
import PlusIcon from '../../../public/svg/Plus.svg';
import { useFilter, useFilterUpdate } from '../contexts/FilterContext';
import { setStorageItem, STORAGE_KEYS } from '../../utils/storage';
import dayjs from 'dayjs';

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

const fixture = [
  { title: '1', uri: 'string', createdAt: dayjs('2022-01-03').toDate() },
  { title: '2', uri: 'string', createdAt: dayjs('2022-02-04').toDate() },
  { title: '3', uri: 'string', createdAt: dayjs('2022-05-13').toDate() },
  { title: '4', uri: 'string', createdAt: dayjs('2022-06-18').toDate() },
];

const Header = () => {
  const theme = useTheme();
  const { dateSortedBy } = useFilter();
  const { setDateSortedBy } = useFilterUpdate();

  const onClickPlus = () => {
    setStorageItem(STORAGE_KEYS.bookmarks, fixture);
  };

  const onClickSorted = () => {
    if (dateSortedBy === 'newer') {
      setDateSortedBy('older');
    } else {
      setDateSortedBy('newer');
    }
  };

  return (
    <div css={styles.wrapper(theme)}>
      <div css={styles.plusIcon} onClick={onClickPlus}>
        <PlusIcon />
      </div>
      <div css={styles.sortIcon} onClick={onClickSorted}>
        <SortIcon />
      </div>
    </div>
  );
};

export default Header;
