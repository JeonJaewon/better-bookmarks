import { css, Theme, useTheme } from '@emotion/react';
import { DateSortingOption, dateSortingOptionAtom } from '@src/Filter/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Select } from '@mantine/core';
import { Plus } from 'react-feather';
import { headerHeightAtom } from '@src/UI/atoms';
import { openAddBookmarkModal } from '@src/Bookmark/components/AddBookmarkModal/policy';

const FILTER_OPTIONS: { value: DateSortingOption; label: string }[] = [
  { value: 'older', label: 'Date - Ascending' },
  { value: 'newer', label: 'Date - Descending' },
];

export const Header = () => {
  const theme = useTheme();
  const [dateSortingOption, setDateSortingOption] = useAtom(
    dateSortingOptionAtom,
  );
  const headerHeight = useAtomValue(headerHeightAtom);

  const handleChageSortOption = (value: DateSortingOption) => {
    setDateSortingOption(value);
  };

  return (
    <div css={styles.wrapper(theme, headerHeight)}>
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
  wrapper: (theme: Theme, height: number) => {
    return css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.secondaryBackground,
      padding: '0 16px',
      height,
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
