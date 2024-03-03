import { Box, Flex, Heading } from '@chakra-ui/react';
import Topics from './Topics';
import Streak from './Streak';
import Quiz from './Quiz';

const Profile = () => {
  return (
    <Box mt="5rem" mx="auto" w="100%" maxW={['95%', '95%', '800px']}>
      <Flex mb="2rem">
        <Heading as="h2">Your profile</Heading>
      </Flex>
      <Box my="2rem">
        <Topics />
      </Box>
      <Box my="2rem">
        <Streak />
      </Box>
      <Box my="2rem">
        <Quiz />
      </Box>
    </Box>
  );
};

export default Profile;
