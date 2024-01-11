import { Box, Flex } from '@chakra-ui/react';
import loginBG from '../assets/login.jpg';
import Form from '../components/Login/Form';

const LoginRoute = () => {
  return (
    <Box height="100%">
      <Flex flexDir={['column-reverse', 'column-reverse', 'row']}>
        <Box
          width={['100%', '100%', '50%']}
          height="100vh"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundImage={`url(${loginBG})`}
        ></Box>
        <Flex
          align="center"
          flexDir="column"
          width={['100%', '100%', '50%']}
          height="100vh"
        >
          <Form />
        </Flex>
      </Flex>
    </Box>
  );
};

export default LoginRoute;
