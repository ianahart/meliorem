import { Box, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export interface IHamburgerMenuLinkMinProps {
  linkName: string;
  linkPath: string;
  icon: string | React.ReactNode;
}

const HamburgerMenuLinkMin = ({
  linkName,
  linkPath,
  icon,
}: IHamburgerMenuLinkMinProps) => {
  return (
    <RouterLink to={linkPath}>
      <Flex
        my="1rem"
        align="center"
        _hover={{ borderColor: 'rgba(134,74,249, 0.5)' }}
        borderLeft="5px solid"
        borderRadius={4}
        borderColor="transparent"
        fontSize="1.75rem"
        p="1rem"
      >
        <Box mr="0.5rem" fontSize="2.5rem" fontWeight="bold" color="primary.dark">
          {icon}
        </Box>
        <Box>
          <Text fontWeight="bold" color="text.secondary">
            {linkName}
          </Text>
        </Box>
      </Flex>
    </RouterLink>
  );
};

export default HamburgerMenuLinkMin;
