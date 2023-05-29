import { css, Theme, useTheme } from '@emotion/react';
import { useAddBookmarkModal } from '@src/features/Bookmark/hooks/useAddBookmarkModal';
import {
  DateSortingOption,
  dateSortingOptionAtom,
} from '@src/features/Filter/atoms';
import { useAtom } from 'jotai';
import { Select } from '@mantine/core';
import { Plus } from 'react-feather';

const FILTER_OPTIONS: { value: DateSortingOption; label: string }[] = [
  { value: 'older', label: 'Date - Ascending' },
  { value: 'newer', label: 'Date - Descending' },
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
      <button
        type="button"
        css={styles.addButton}
        onClick={openAddBookmarkModal}
      >
        <Plus color="#FFFFFF" size="18" />
        <span>Add Bookmark</span>
      </button>
      <div css={styles.sortSelect}>
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
  addButton: css({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    border: '1px solid white',
    borderRadius: '4px',
    backgroundColor: '#25262b',
    padding: '6px 16px 6px 8px',
    gap: '4px',
  }),
  sortSelect: css({
    borderRadius: '4px',
    width: '180px',
    '& input::placeholder': {
      color: 'white',
    },
  }),
};
