import { Box, Flex, Heading } from '@chakra-ui/react';
import Topics from './Topics';

const Profile = () => {
  return (
    <Box mt="5rem" mx="auto" w="100%" maxW={['95%', '95%', '800px']}>
      <Flex mb="2rem">
        <Heading as="h2">Your profile</Heading>
      </Flex>
      <Topics />
    </Box>
  );
};

export default Profile;
