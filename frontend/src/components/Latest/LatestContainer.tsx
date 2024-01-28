import { Box } from '@chakra-ui/react';

interface ILatestContainerProps {
  children: React.ReactNode;
}

const LatestContainer = ({ children }: ILatestContainerProps) => {
  return (
    <Box as="section" w="100%" maxW="960px" mx="auto" minH="100vh">
      {children}
    </Box>
  );
};

export default LatestContainer;
