export const STORAGE_KEYS = Object.freeze({
  BOOKMARKS: 'bookmarks',
});

export const getStorageItem = async (key: string) => {
  const item = await chrome.storage.sync.get(key);
  return item[key];
};

export const setStorageItem = async (key: string, value: any) => {
  const result = await chrome.storage.sync.set({ [key]: value });
  return result;
};
