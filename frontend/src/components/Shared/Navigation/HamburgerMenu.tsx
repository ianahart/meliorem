import { Box, Flex } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import HamburgerMenuLinks from './HamburgerMenuLinks';

interface IHamburgerMenuProps {
  closeHamburgerMenu: () => void;
}

const HamburgerMenu = ({ closeHamburgerMenu }: IHamburgerMenuProps) => {
  const TABLET_WIDTH = 768;

  const handleResize = useCallback(
    (event: Event) => {
      const target = event.target as Window;
      if (target.innerWidth > TABLET_WIDTH) {
        closeHamburgerMenu();
      }
    },
    [closeHamburgerMenu]
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Box width="100%" minH="100vh" top="0" bg="#fff" zIndex={10} left="0" pos="absolute">
      <Flex m="1rem" justify="flex-end">
        <Flex
          onClick={closeHamburgerMenu}
          cursor="pointer"
          transition="0.25s ease-in"
          _hover={{ background: 'light.primary' }}
          justify="center"
          align="center"
          color="text.secondary"
          fontSize="2.2rem"
          border="1px solid"
          borderColor="border.primary"
          height="35px"
          width="35px"
          borderRadius="50%"
        >
          <AiOutlineClose />
        </Flex>
      </Flex>
      <HamburgerMenuLinks />
    </Box>
  );
};

export default HamburgerMenu;
