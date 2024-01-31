import { Box, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundRoute = () => {
  return (
    <Box minH="100vh" as="section">
      <Box
        color="#fff"
        bg="form.primary"
        borderRadius={8}
        mx="auto"
        mt="5rem"
        p="1rem"
        w="100%"
        minH="140px"
        maxW={['95%', '95%', '768px']}
        as="section"
      >
        <Heading fontSize="3rem" mb="1.5rem">
          404
        </Heading>
        <Text mb="3rem" fontSize="1.2rem">
          You didn't break the internet, but we can't find what you're looking for.
        </Text>

        <RouterLink to="/">
          <Text textDecor="underline" fontWeight="bold">
            Go back home
          </Text>
        </RouterLink>
      </Box>
    </Box>
  );
};

export default NotFoundRoute;
