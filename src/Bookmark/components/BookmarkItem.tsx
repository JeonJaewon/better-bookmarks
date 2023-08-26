import { css, Theme, useTheme } from '@emotion/react';
import { Button } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { ManageBookmarkModal } from '@src/Bookmark/components/ManageBookmarkModal';
import { BookmarkItemData } from '@src/Bookmark/types';
import {
  bookmarkItemHeightAtom,
  bookmarkItemMarginBottomAtom,
} from '@src/UI/atoms';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { useRef } from 'react';
import { MoreHorizontal } from 'react-feather';
import { draggingBookmarkItemAtom } from '@src/Drag/atoms';

type BookmarkItemProps = {
  item: BookmarkItemData;
  onDrag: (e: PointerEvent) => void;
};

export const BookmarkItem = ({ item, onDrag }: BookmarkItemProps) => {
  const { title, url } = item;
  const theme = useTheme();
  const bookmarkItemHeight = useAtomValue(bookmarkItemHeightAtom);
  const bookmarkItemMarginBottom = useAtomValue(bookmarkItemMarginBottomAtom);
  const [draggingBookmarkItem, setDraggingBookmarkItem] = useAtom(
    draggingBookmarkItemAtom,
  );
  const isDragging = useRef(false);

  const handleClickItem = () => {
    if (isDragging.current) {
      return;
    }
    window.open(url);
  };

  const handleDragStart = () => {
    isDragging.current = true;
    setDraggingBookmarkItem(item);
  };

  const handleDragEnd = (event: MouseEvent) => {
    // TODO dragEnd시 발생하는 클릭 이벤트가 발생하는 것을 방지하기 위해 setTimeout을 사용한다.
    // 동작하는 다른 해결책 찾기
    setTimeout(() => {
      isDragging.current = false;

      const directories = document.getElementsByClassName('directory');
      Array.from(directories).some((directory) => {
        // Calculate the position of the drop target
        const dropTargetRect = directory.getBoundingClientRect();

        // Calculate the position where the mouse was released
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Check if the dragged element was released inside the drop target
        if (
          mouseX >= dropTargetRect.left &&
          mouseX <= dropTargetRect.right &&
          mouseY >= dropTargetRect.top &&
          mouseY <= dropTargetRect.bottom
        ) {
          console.log(draggingBookmarkItem);
          return true;
        }
        return false;
      });
    }, 10);
  };

  const openManageBookmarkModal = (event: React.MouseEvent) => {
    openModal({
      title: 'Manage Bookmark',
      children: <ManageBookmarkModal url={url} />,
      centered: true,
    });
    event.stopPropagation();
  };

  return (
    <div key={url} id="bookmark">
      <motion.div
        layout
        drag
        dragSnapToOrigin
        onClick={handleClickItem}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={onDrag}
        css={styles.wrapper(
          theme,
          bookmarkItemHeight,
          bookmarkItemMarginBottom,
        )}
      >
        <span css={styles.title}>{title}</span>
        <Button
          onClick={openManageBookmarkModal}
          css={styles.moreButton}
          type="button"
        >
          <MoreHorizontal size="18" />
        </Button>
      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: (theme: Theme, height: number, marginBottom: number) =>
    css({
      cursor: 'pointer',
      width: '100%',
      color: '#ffffff',
      // padding: '14px 12px',
      backgroundColor: theme.item.backgroundColor,
      borderRadius: 4,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-flex',
      justifyContent: 'space-between',
      height,
      marginBottom,
    }),
  title: css({
    padding: '14px 12px',
    flex: '1',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '88%',
    fontSize: '14px',
  }),
  moreButton: css({
    height: '100%',
    width: '50px',
    backgroundColor: 'transparent',
    padding: '0 12px',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.25)',
    },
  }),
};
