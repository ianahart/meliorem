import { Box } from '@chakra-ui/react';
import { RefObject, useCallback, useEffect } from 'react';

export interface IClickAwayMenuProps {
  triggerRef: RefObject<HTMLDivElement>;
  menuRef: RefObject<HTMLDivElement>;
  children: React.ReactNode;
  width: string;
  height: string;
  backgroundColor: string;
  top: string[];
  left: string[];
  right: string[];
  bottom: string[];
  handleMenuOpen: (open: boolean) => void;
}

const ClickAwayMenu = ({
  triggerRef,
  menuRef,
  children,
  width,
  height,
  backgroundColor,
  top,
  left,
  right,
  bottom,
  handleMenuOpen,
}: IClickAwayMenuProps) => {
  const clickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (menuRef.current !== null && triggerRef !== null) {
        if (!menuRef.current.contains(target) && !triggerRef?.current?.contains(target)) {
          handleMenuOpen(false);
        }
      }
    },
    [handleMenuOpen, triggerRef]
  );

  useEffect(() => {
    window.addEventListener('click', clickAway);
    return () => window.removeEventListener('click', clickAway);
  }, [clickAway]);

  return (
    <Box
      zIndex={10}
      ref={menuRef}
      pos="absolute"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      borderRadius={8}
      minH={height}
      width={width}
      backgroundColor={backgroundColor}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      border="1px solid"
      borderColor="border.primary"
    >
      {children}
    </Box>
  );
};

export default ClickAwayMenu;
