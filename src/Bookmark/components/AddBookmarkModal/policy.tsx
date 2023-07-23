import { openModal } from '@mantine/modals';
import { AddBookmarkModal } from '@src/Bookmark/components/AddBookmarkModal';

export const openAddBookmarkModal = () => {
  openModal({
    title: 'Add Bookmark',
    children: <AddBookmarkModal />,
    centered: true,
  });
};
