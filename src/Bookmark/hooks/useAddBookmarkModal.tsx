import { css } from '@emotion/react';
import { Button, TextInput } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { setStorageItem, STORAGE_KEYS } from '@src/utils/storage';
import { getCurrentTab } from '@src/utils/tabs';
import { useAtomValue, useSetAtom } from 'jotai';
import { addBookmarkAtom, bookmarksAtom } from '@src/Bookmark/atoms';
import { BookmarkItemData } from '@src/Bookmark/types';
import { getCurrentMilliseconds } from '@src/utils/time';

const AddBookmarkModal = () => {
  const [title, setTitle] = useState('');
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();
  const bookmarks = useAtomValue(bookmarksAtom);
  const addBookmark = useSetAtom(addBookmarkAtom);

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
      const newItem: BookmarkItemData = {
        title,
        url: currentTab.url,
        createdAt: getCurrentMilliseconds(),
      };
      addBookmark(newItem);
      setStorageItem(STORAGE_KEYS.bookmarks, [...bookmarks, newItem]);
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

export const useAddBookmarkModal = () => {
  const openAddBookmarkModal = () =>
    openModal({
      title: 'Add Bookmark',
      children: <AddBookmarkModal />,
      centered: true,
    });
  return { openAddBookmarkModal };
};

const styles = {
  confirmButton: css({
    width: '100%',
    height: 40,
    marginTop: 20,
  }),
};
