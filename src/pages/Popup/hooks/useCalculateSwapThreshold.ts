import {
  bookmarkItemHeightAtom,
  bookmarkItemMarginBottomAtom,
  bookmarkListPaddingTopAtom,
  headerHeightAtom,
} from '@src/atoms/ui';
import { useAtomValue } from 'jotai';

type SwapType = 'UP' | 'DOWN';

export const useCalculateSwapThreshold = () => {
  const headerHeight = useAtomValue(headerHeightAtom);
  const bookmarkListPaddingTop = useAtomValue(bookmarkListPaddingTopAtom);
  const bookmarkItemMarginBottom = useAtomValue(bookmarkItemMarginBottomAtom);
  const bookmarkItemHeight = useAtomValue(bookmarkItemHeightAtom);

  const getBookmarkItemCount = (index: number, swapType: SwapType) => {
    switch (swapType) {
      case 'UP':
        return index;
      case 'DOWN':
      default:
        return index + 1;
    }
  };

  const calculateSwapThreshold = (
    index: number,
    swapType: SwapType,
  ): number => {
    return (
      headerHeight +
      bookmarkListPaddingTop +
      getBookmarkItemCount(index, swapType) *
        (bookmarkItemHeight + bookmarkItemMarginBottom)
    );
  };

  return calculateSwapThreshold;
};
