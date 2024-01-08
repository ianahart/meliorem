import { Box, Flex } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

interface IHamburgerMenuProps {
  closeHamburgerMenu: () => void;
}

const HamburgerMenu = ({ closeHamburgerMenu }: IHamburgerMenuProps) => {
  return (
    <Box
      border="1px solid blue"
      width="100%"
      minH="100vh"
      top="65px"
      bg="#fff"
      zIndex={10}
      left="0"
      pos="absolute"
    >
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
    </Box>
  );
};

export default HamburgerMenu;
