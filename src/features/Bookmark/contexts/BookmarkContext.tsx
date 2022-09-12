import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { useContextSafely } from '@src/common/hooks/useContextSafely';

interface BookmarkContextValue {
  bookmarks: BookmarkItemData[];
}
interface BookmarkUpdateContextValue {
  setBookmarks: Dispatch<SetStateAction<BookmarkItemData[]>>;
}
interface BookmarkProviderProps {
  children: ReactNode;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);
const BookmarkUpdateContext = createContext<BookmarkUpdateContextValue | null>(
  null,
);

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
  const [bookmarks, setBookmarks] = useState([]);
  return (
    <BookmarkUpdateContext.Provider value={{ setBookmarks }}>
      <BookmarkContext.Provider value={{ bookmarks }}>
        {children}
      </BookmarkContext.Provider>
    </BookmarkUpdateContext.Provider>
  );
};
export const useBookmarkContext = () => useContextSafely(BookmarkContext);
export const useBookmarkUpdateContext = () =>
  useContextSafely(BookmarkUpdateContext);
