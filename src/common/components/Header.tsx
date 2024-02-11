import { css, Theme, useTheme } from '@emotion/react';
import { DateSortingOption, dateSortingOptionAtom } from '@src/Filter/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { Select } from '@mantine/core';
import { Plus } from 'react-feather';
import { headerHeightAtom } from '@src/UI/atoms';
import { AddBookmarkModal } from '@src/Bookmark/components/AddBookmarkModal';
import { openModal } from '@mantine/modals';
import { darkTheme } from '@src/styles/themes';

const FILTER_OPTIONS: { value: DateSortingOption; label: string }[] = [
  { value: 'older', label: 'Date - Oldest to Newest' },
  { value: 'newer', label: 'Date - Newest to Oldest' },
];

export const Header = () => {
  const theme = useTheme();
  const [dateSortingOption, setDateSortingOption] = useAtom(
    dateSortingOptionAtom,
  );
  const headerHeight = useAtomValue(headerHeightAtom);

  const handleChangeSortOption = (value: DateSortingOption) => {
    setDateSortingOption(value);
  };

  const openAddBookmarkModal = () => {
    openModal({
      title: 'Add Bookmark',
      children: <AddBookmarkModal />,
      centered: true,
    });
  };

  return (
    <div css={styles.wrapper(theme, headerHeight)}>
      <button
        type="button"
        css={styles.addButton(theme)}
        onClick={openAddBookmarkModal}
      >
        <Plus color={darkTheme.grayDark.gray12} size="18" />
        <span>Add Bookmark</span>
      </button>
      <div css={styles.sortSelect}>
        <Select
          placeholder="Sort By"
          value={dateSortingOption}
          onChange={handleChangeSortOption}
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
      backgroundColor: theme.grayDark.gray6,
      padding: '0 16px',
      height,
    });
  },
  addButton: (theme: Theme) =>
    css({
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      borderRadius: '4px',
      border: `1px solid ${theme.grayDark.gray6}`,
      backgroundColor: theme.grayDark.gray4,
      padding: '8px 16px 8px 8px',
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
