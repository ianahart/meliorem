import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import MainActions from './MainActions';
import { useContext, useEffect, useRef, useState } from 'react';
import GoalForm from './GoalForm';
import { GoalContext } from '../../context/goal';
import { IGoalContext } from '../../interfaces';
import { Client } from '../../util/client';
import Goal from './Goal';
import { Outlet } from 'react-router-dom';
import Progress from './Progress';

const Goals = () => {
  const shouldRun = useRef(true);
  const { goals, pagination, updatePagination, addMultipleGoals, filter, subject, completion } = useContext(
    GoalContext
  ) as IGoalContext;
  const [newGoalFormOpen, setNewGoalFormOpen] = useState(false);

  const getGoals = (paginate: boolean, direction: string) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getGoals(pageNum, pagination.pageSize, direction, filter, subject, completion)
      .then((res) => {
        const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
        updatePagination({ page, pageSize, direction, totalPages, totalElements });
        addMultipleGoals(items);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getGoals(false, 'next');
    }
  }, [shouldRun.current, getGoals]);

  useEffect(() => {
    if (filter.length && subject.length && completion.length) {
      console.log('TEST');
      getGoals(false, 'next');
    } else {
      console.log('fOO');
    }
  }, [filter, subject, completion]);

  return (
    <Box bg="bg.dark" pt="5rem" minH="100vh">
      <Box mx="auto" maxW="1280px" w="100%" mb="2rem">
        <Heading as="h2" fontSize="3rem" color="#fff">
          Your goals
        </Heading>
      </Box>
      <Box pt="5rem" px="1rem" borderRadius={8} pb="1rem" mx="auto" maxW="1280px" w="100%" bg="bg.primary" minH="900px">
        <Box my="1rem">
          <MainActions setNewGoalFormOpen={setNewGoalFormOpen} />
        </Box>
        <Box>
          <Box>
            <Heading fontSize="1.4rem" color="light.primary" as="h3">
              View All Goals
            </Heading>
            <Progress />
          </Box>
          <Flex mt="3rem" flexDir={['column', 'column', 'row']} minH="600px">
            <Box width={['100%', '100%', '50%']} minH="600px">
              {goals.map((goal) => {
                return <Goal key={goal.id} data={goal} />;
              })}
              <Flex justify="center">
                {pagination.page > 0 && (
                  <Button mx="1rem" colorScheme="purple" onClick={() => getGoals(true, 'prev')}>
                    Prev
                  </Button>
                )}
                <Text color="light.primary">
                  {pagination.page + 1} of {pagination.totalPages}
                </Text>

                {pagination.page < pagination.totalPages - 1 && (
                  <Button mx="1rem" colorScheme="purple" onClick={() => getGoals(true, 'next')}>
                    Next
                  </Button>
                )}
              </Flex>
            </Box>
            <Box width={['100%', '100%', '50%']} borderLeft="1px solid" borderColor="gray.700" minH="600px">
              <Outlet />
            </Box>
          </Flex>
        </Box>
        <GoalForm
          goalId={0}
          method="POST"
          newGoalFormOpen={newGoalFormOpen}
          setNewGoalFormOpen={setNewGoalFormOpen}
          title="Create New Goal"
          buttonText="Create"
        />
      </Box>
    </Box>
  );
};

export default Goals;
