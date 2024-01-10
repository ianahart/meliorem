import { Box, Flex } from '@chakra-ui/react';
import registerBG from '../assets/create_account.jpg';
import Form from '../components/Register/Form';

const RegisterRoute = () => {
  return (
    <Box height="100%">
      <Flex flexDir={['column-reverse', 'column-reverse', 'row']}>
        <Box
          width={['100%', '100%', '50%']}
          height="100vh"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundImage={`url(${registerBG})`}
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

export default RegisterRoute;
