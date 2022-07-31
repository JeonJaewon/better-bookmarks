import { css } from '@emotion/react';
import { Button, Modal, TextInput } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { setStorageItem, STORAGE_KEYS } from '../../../utils/storage';
import { getCurrentTab } from '../../../utils/tabs';
import {
  useBookmarkContext,
  useBookmarkUpdateContext,
} from '../contexts/BookmarkContext';

const styles = {
  confirmButton: css({
    width: '100%',
    height: 40,
    marginTop: 20,
  }),
};

const AddBookmarkModal = () => {
  const [title, setTitle] = useState('');
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();
  const { bookmarks } = useBookmarkContext();
  const { setBookmarks } = useBookmarkUpdateContext();

  useEffect(() => {
    const initCurrentTabData = async () => {
      const data = await getCurrentTab();
      setCurrentTab(data);
    };
    initCurrentTabData();
  }, []);

  useEffect(() => {
    if (currentTab) {
      setTitle(currentTab.title);
    }
  }, [currentTab]);

  const handleOnConfirm = async () => {
    try {
      const newItem = {
        title,
        url: currentTab.url,
        createdAt: dayjs().format('YYYY-MM-DD'),
      };
      const updatedList = [...bookmarks, newItem];
      setBookmarks(updatedList);
      setStorageItem(STORAGE_KEYS.bookmarks, updatedList);
      closeAllModals();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <TextInput
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title of the Bookmark"
        required
      />
      <Button css={styles.confirmButton} onClick={handleOnConfirm}>
        Add it!
      </Button>
    </>
  );
};

const useAddBookmarkModal = () => {
  const openAddBookmarkModal = () =>
    openModal({
      title: 'Add Bookmark',
      children: <AddBookmarkModal />,
      centered: true,
    });
  return { openAddBookmarkModal };
};

export default useAddBookmarkModal;
