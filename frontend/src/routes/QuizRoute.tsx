import { Box } from '@chakra-ui/react';
import Quiz from '../components/Quiz';

const QuizRoute = () => {
  return (
    <Box m="1rem" p="1rem">
      <Box mx="auto" mt="10rem" maxW={['100%', '100%', '768px']}>
        <Quiz />
      </Box>
    </Box>
  );
};

export default QuizRoute;
