import { Button, Modal, TextInput } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  getStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from '../../../utils/storage';
import { getCurrentTab } from '../../../utils/tabs';

interface AddBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookmarkModal = ({ isOpen, onClose }: AddBookmarkModalProps) => {
  const [title, setTitle] = useState('');

  const handleOnConfirm = async () => {
    const currentTab = await getCurrentTab();
    const currentList = (await getStorageItem(STORAGE_KEYS.bookmarks)) ?? [];
    setStorageItem(STORAGE_KEYS.bookmarks, [
      ...currentList,
      {
        title,
        url: currentTab.url,
        createdAt: dayjs().format('YYYY-MM-DD'),
      },
    ]);
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
