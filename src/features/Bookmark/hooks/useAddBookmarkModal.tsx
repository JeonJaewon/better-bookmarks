import { Button, Modal, TextInput } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  getStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from '../../../utils/storage';
import { getCurrentTab } from '../../../utils/tabs';
import {
  useBookmarkContext,
  useBookmarkUpdateContext,
} from '../contexts/BookmarkContext';

interface AddBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookmarkModal = ({ isOpen, onClose }: AddBookmarkModalProps) => {
  const [title, setTitle] = useState('');
  const { bookmarks } = useBookmarkContext();
  const { setBookmarks } = useBookmarkUpdateContext();

  const handleOnConfirm = async () => {
    try {
      const currentTab = await getCurrentTab();
      const updatedList = [
        ...bookmarks,
        {
          title,
          url: currentTab.url,
          createdAt: dayjs().format('YYYY-MM-DD'),
        },
      ];
      setBookmarks(updatedList);
      setStorageItem(STORAGE_KEYS.bookmarks, updatedList);
      onClose();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add Bookmark" centered>
      <TextInput
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title of the Bookmark"
        required
      />
      <Button onClick={handleOnConfirm}>Add it!</Button>
    </Modal>
  );
};

const useAddBookmarkModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Modal = () => (
    <AddBookmarkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );

  return { Modal, setIsOpen };
};

export default useAddBookmarkModal;
