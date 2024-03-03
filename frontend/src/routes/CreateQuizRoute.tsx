import { Box } from '@chakra-ui/react';
import Form from '../components/Quiz/Form';

const CreateQuizRoute = () => {
  return (
    <Box m="1rem" p="1rem">
      <Box mx="auto" mt="10rem" maxW={['100%', '100%', '768px']}>
        <Form />
      </Box>
    </Box>
  );
};

export default CreateQuizRoute;
