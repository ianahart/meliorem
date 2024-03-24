import { Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Client } from '../../util/client';
import { goalState } from '../../data';
import { IGoal, IGoalContext, IUserContext } from '../../interfaces';
import { IoBookSharp } from 'react-icons/io5';
import { PiCardsFill } from 'react-icons/pi';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

//@ts-ignore
import dayjs from 'dayjs';
import GoalForm from './GoalForm';
import { UserContext } from '../../context/user';
import { GoalContext } from '../../context/goal';

const GoalDetails = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const { updatePagination, addMultipleGoals, setFilter, setSubject, setCompletion, markGoalCompleted } = useContext(
    GoalContext
  ) as IGoalContext;
  const navigate = useNavigate();
  const params = useParams();
  const [goal, setGoal] = useState<IGoal>(goalState);
  const [newGoalFormOpen, setNewGoalFormOpen] = useState(false);

  const handleMarkGoalCompleted = () => {
    const isCompleted = goal.isCompleted ? false : true;

    Client.markGoalCompleted(goal.id, isCompleted)
      .then(() => {
        markGoalCompleted(goal.id, isCompleted);
        setGoal((prevState) => ({
          ...prevState,
          isCompleted,
        }));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleOnDeleteGoal = async () => {
    try {
      await Client.deleteGoal(goal.id);

      const response = await Client.getGoals(-1, 10, 'next');
      const { direction, items, page, pageSize, totalElements, totalPages } = response.data.data;
      updatePagination({ page, pageSize, direction, totalPages, totalElements });
      addMultipleGoals(items);
      setFilter('');
      setSubject('');
      setCompletion('');
      navigate(`/${user.slug}/goals`);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const getGoal = (id: string | undefined) => {
    if (id !== undefined) {
      Client.getGoal(id)
        .then((res) => {
          setGoal(res.data.data);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate('*');
          }
          throw new Error(err.message);
        });
    }
  };

  useEffect(() => {
    getGoal(params.id);
  }, [params.id]);

  return (
    <Box color="light.primary" borderTop="1px solid" borderColor="gray.700">
      <Flex justify="space-between" p="2rem" borderBottom="1px solid" borderColor="gray.700">
        <Flex align="center">
          <Flex
            flexDir="column"
            align="center"
            justify="center"
            borderRadius={50}
            bg="light.primary"
            height="24px"
            width="24px"
            mr="1.5rem"
          >
            <Box color="black" fontSize="2rem">
              {goal.goalType === 'READING' ? <IoBookSharp /> : <PiCardsFill />}
            </Box>
          </Flex>
          <Heading fontSize="1.4rem" as="h3">
            {goal.goalTitle}
          </Heading>
        </Flex>
        {/*ACTIONS HERE*/}
        <Flex>
          <Tooltip label={goal.isCompleted ? 'Mark as uncompleted' : 'Mark as completed'}>
            <Flex
              onClick={handleMarkGoalCompleted}
              cursor="pointer"
              flexDir="column"
              align="center"
              justify="center"
              borderRadius={50}
              bg="light.primary"
              height="24px"
              width="24px"
              mx="1rem"
              color="black"
              fontSize="1.4rem"
            >
              <FaCheckCircle />
            </Flex>
          </Tooltip>
          <Tooltip label="Edit">
            <Flex
              onClick={() => setNewGoalFormOpen(true)}
              cursor="pointer"
              flexDir="column"
              align="center"
              justify="center"
              borderRadius={50}
              bg="light.primary"
              height="24px"
              width="24px"
              mx="1rem"
              color="black"
              fontSize="1.4rem"
            >
              <FaEdit />
            </Flex>
          </Tooltip>
          <Tooltip label="Delete">
            <Flex
              onClick={handleOnDeleteGoal}
              cursor="pointer"
              flexDir="column"
              align="center"
              justify="center"
              borderRadius={50}
              bg="light.primary"
              height="24px"
              width="24px"
              mx="1rem"
              color="black"
              fontSize="1.4rem"
            >
              <FaTrash />
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
      <Box p="2rem" width={['100%', '100%', '65%']}>
        <Flex my="2rem" align="center" justify="space-between">
          <Text color="#fff" alignSelf="flex-end" fontWeight="bold">
            GOAL TYPE
          </Text>
          <Text color="light.primary" mt="1rem">
            {goal.goalType.slice(0, 1).toUpperCase() + goal.goalType.slice(1).toLowerCase()}
          </Text>
        </Flex>
        <Flex my="2rem" align="center" justify="space-between">
          <Text alignSelf="flex-end" color="#fff" fontWeight="bold">
            GOAL CREATED ON
          </Text>
          <Text width="50%" textAlign="right" color="light.primary" mt="1rem" lineHeight="1.6">
            {dayjs(goal.createdAt).format('MMMM DD, YYYY')}
          </Text>
        </Flex>
        <Flex my="2rem" align="center" justify="space-between">
          <Text color="#fff" fontWeight="bold">
            GOAL DESCRIPTION
          </Text>
          <Text width="50%" textAlign="right" color="light.primary" mt="1rem" lineHeight="1.6">
            {goal.goalDesc}
          </Text>
        </Flex>
        <Flex my="2rem" align="center" justify="space-between">
          <Text alignSelf="flex-end" color="#fff" fontWeight="bold">
            DEADLINE
          </Text>
          <Text width="50%" textAlign="right" color="light.primary" mt="1rem" lineHeight="1.6">
            {dayjs(goal.targetCompletionDate).format('MMMM DD, YYYY')}
          </Text>
        </Flex>
        <Flex flexDir="column" my="2rem" align="center" justify="center">
          <Text fontWeight="bold" color="#fff">
            {goal.isCompleted ? 'COMPLETED' : 'INCOMPLETE'}
          </Text>
          <Box height="2px" width="100%" bg="primary.dark"></Box>
        </Flex>
      </Box>
      {newGoalFormOpen && (
        <GoalForm
          goalId={goal.id}
          method="PUT"
          newGoalFormOpen={newGoalFormOpen}
          setNewGoalFormOpen={setNewGoalFormOpen}
          title="Edit Goal"
          buttonText="Save"
        />
      )}
    </Box>
  );
};

export default GoalDetails;
