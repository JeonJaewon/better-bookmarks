import { css, Theme, useTheme } from '@emotion/react';
import PlusIcon from '@public/svg/Plus.svg';
import { useAddBookmarkModal } from '@src/features/Bookmark/hooks/useAddBookmarkModal';
import {
  DateSortingOption,
  dateSortingOptionAtom,
} from '@src/features/Filter/atoms';
import { useAtom } from 'jotai';
import { Select } from '@mantine/core';

const FILTER_OPTIONS: { value: DateSortingOption; label: string }[] = [
  { value: 'older', label: 'Date Added - Ascending' },
  { value: 'newer', label: 'Date Added - Descending' },
];

export const Header = () => {
  const theme = useTheme();
  const { openAddBookmarkModal } = useAddBookmarkModal();
  const [dateSortingOption, setDateSortingOption] = useAtom(
    dateSortingOptionAtom,
  );

  const handleChageSortOption = (value: DateSortingOption) => {
    setDateSortingOption(value);
  };

  return (
    <div css={styles.wrapper(theme)}>
      <div css={styles.plusIcon} onClick={openAddBookmarkModal}>
        <PlusIcon />
      </div>
      <div css={styles.sortIcon}>
        <Select
          placeholder="Sort By"
          value={dateSortingOption}
          onChange={handleChageSortOption}
          data={FILTER_OPTIONS}
        />
      </div>
    </div>
  );
};

const styles = {
  wrapper: (theme: Theme) => {
    return css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.secondaryBackground,
      height: 60,
      padding: '0 16px',
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
