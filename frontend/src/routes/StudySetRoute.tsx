import { Box, Heading } from '@chakra-ui/react';
import Form from '../components/StudySet/Form/Form';

const StudySetRoute = () => {
  return (
    <Box
      maxW="1280px"
      p="1rem"
      margin="5rem auto 2rem auto"
      as="section"
      color="primary.light"
    >
      <Heading fontSize="3rem" as="h1">
        Create a new study set
      </Heading>
      <Box m="6rem auto 2rem auto" as="section">
        <Form />
      </Box>
    </Box>
  );
};

export default StudySetRoute;
