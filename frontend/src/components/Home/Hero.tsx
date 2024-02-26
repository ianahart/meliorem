import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import heroImg from '../../assets/landing__hero.jpeg';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  return (
    <Box p="1rem" backgroundSize="cover" backgroundPosition="center" bgImg={`url(${heroImg})`} minH="700px">
      <Flex align="center" maxW="1180px" justify="flex-start" mx="auto" minH="inherit">
        <Box borderRadius={2} color="#fff" p="2rem" bg="rgba(0, 0, 0, 0.45)" width={['100%', '350px', '350px']}>
          <Heading my="1rem" as="h2">
            Experience a new way to study with others
          </Heading>
          <Text my="1rem" lineHeight="1.6" fontSize="1.2rem">
            Meliorem is your one stop shop for studying new topics. Join our community and connect with other students
            around the globe.
          </Text>
          <Box my="1rem">
            <RouterLink to="/register">
              <Button colorScheme="blue" size="lg">
                Sign up now
              </Button>
            </RouterLink>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
