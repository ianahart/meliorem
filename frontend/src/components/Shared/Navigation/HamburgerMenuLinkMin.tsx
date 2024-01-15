import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface IHamburgerMenuLinkMinProps {
  linkName: string;
  linkPath: string;
  icon: string | React.ReactNode;
  closeHamburgerMenu: () => void;
}

const HamburgerMenuLinkMin = ({
  linkName,
  linkPath,
  icon,
  closeHamburgerMenu,
}: IHamburgerMenuLinkMinProps) => {
  const navigate = useNavigate();

  const navigateAway = () => {
    closeHamburgerMenu();
    navigate(linkPath);
  };
  return (
    <Flex
      cursor="pointer"
      onClick={navigateAway}
      color="primary.light"
      my="1rem"
      align="center"
      _hover={{ borderColor: 'rgba(134,74,249, 0.5)' }}
      borderLeft="5px solid"
      borderRadius={4}
      borderColor="transparent"
      fontSize="1.75rem"
      p="1rem"
    >
      <Box mr="0.5rem" fontSize="2.5rem" fontWeight="bold" color="primary.light">
        {icon}
      </Box>
      <Box>
        <Text fontWeight="bold" color="primary.light">
          {linkName}
        </Text>
      </Box>
    </Flex>
  );
};

export default HamburgerMenuLinkMin;
