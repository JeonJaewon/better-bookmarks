import { Button, TextInput } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { setStorageItem, STORAGE_KEYS } from '@src/lib/utils/storage';
import { getCurrentTab } from '@src/lib/utils/tabs';
import { useAtomValue, useSetAtom } from 'jotai';
import { addBookmarkAtom, bookmarksAtom } from '@src/atoms/bookmark';
import { BookmarkItemData } from '@src/pages/Popup/types';
import { getCurrentMilliseconds } from '@src/lib/utils/time';
import { css } from '@emotion/react';

export const AddBookmarkModal = () => {
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
    if (currentTab?.title !== undefined) {
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
      setStorageItem(STORAGE_KEYS.BOOKMARKS, [...bookmarks, newItem]);
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

const styles = {
  confirmButton: css({
    width: '100%',
    height: 40,
    marginTop: 20,
  }),
};
