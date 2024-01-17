import { Box, Flex } from '@chakra-ui/react';
import Form from '../components/ForgotPassword/Form';

const ForgotPasswordRoute = () => {
  return (
    <Box>
      <Flex minH="80vh" justify="center" flexDir="column" align="center">
        <Form />
      </Flex>
    </Box>
  );
};

export default ForgotPasswordRoute;
