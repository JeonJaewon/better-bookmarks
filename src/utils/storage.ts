export const STORAGE_KEYS = Object.freeze({
  bookmarks: 'bookmarks',
});

export const getStorageItem = async (key: string) => {
  const item = await chrome.storage.sync.get(key);
  return item[key];
};

export const setStorageItem = async (key: string, value: any) => {
  return await chrome.storage.sync.set({ [key]: value });
};
