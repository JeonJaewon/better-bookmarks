import { createContext, ReactNode, useMemo, useState } from 'react';
import { useContextSafely } from '@src/common/hooks/useContextSafely';
import { BookmarkItemData } from '@src/features/Bookmark/types';

interface BookmarkContextValue {
  bookmarks: BookmarkItemData[];
}

interface BookmarkUpdateContextValue {
  setBookmarks: (bookmarks: BookmarkItemData[]) => void;
}

interface BookmarkProviderProps {
  children: ReactNode;
}

const BookmarkContext = createContext<BookmarkContextValue>(null);
const BookmarkUpdateContext = createContext<BookmarkUpdateContextValue>(null);

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItemData[]>([]);

  const setters = useMemo(() => {
    return { setBookmarks };
  }, []);

  const getters = useMemo(() => {
    return { bookmarks };
  }, [bookmarks]);

  return (
    <BookmarkUpdateContext.Provider value={setters}>
      <BookmarkContext.Provider value={getters}>
        {children}
      </BookmarkContext.Provider>
    </BookmarkUpdateContext.Provider>
  );
};

export const useBookmarkContext = () => useContextSafely(BookmarkContext);
export const useBookmarkUpdateContext = () =>
  useContextSafely(BookmarkUpdateContext);
