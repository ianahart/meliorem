import { Flex } from '@chakra-ui/react';
import Form from '../components/ResetPassword/Form';

const ResetPasswordRoute = () => {
  return (
    <Flex minH="80vh" justify="center" flexDir="column" align="center">
      <Form />
    </Flex>
  );
};

export default ResetPasswordRoute;
