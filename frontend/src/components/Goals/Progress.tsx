import { Box, Progress as ProgressBar, Flex, Heading } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { GoalContext } from '../../context/goal';
import { IGoalContext } from '../../interfaces';

const Progress = () => {
  const { goals } = useContext(GoalContext) as IGoalContext;

  const percentCompleted = useMemo(() => {
    const completedCount = [...goals].filter((goal) => goal.isCompleted).length;
    return Math.floor((completedCount / goals.length) * 100);
  }, [goals]);
  return (
    <Box my="2rem">
      <Flex mb="0.5rem" justify="center">
        <Heading as="h3" fontSize="1.6rem" color="#fff">
          Your goals progress
        </Heading>
      </Flex>
      <ProgressBar colorScheme="purple" hasStripe value={percentCompleted} />
    </Box>
  );
};

export default Progress;
