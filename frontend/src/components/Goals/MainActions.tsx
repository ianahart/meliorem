import { Box, Flex, Select, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { GoalContext } from '../../context/goal';
import { IGoalContext } from '../../interfaces';
import { Client } from '../../util/client';

export interface IMainActionsProps {
  setNewGoalFormOpen: (newGoalFormOpen: boolean) => void;
}

const MainActions = ({ setNewGoalFormOpen }: IMainActionsProps) => {
  const { filter, subject, completion, setFilter, setSubject, setCompletion, updatePagination, addMultipleGoals } =
    useContext(GoalContext) as IGoalContext;

  const resetActions = () => {
    Client.getGoals(-1, 10, 'next').then((res) => {
      const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
      updatePagination({ page, pageSize, direction, totalPages, totalElements });
      addMultipleGoals(items);

      setFilter('');
      setSubject('');
      setCompletion('');
    });
  };

  return (
    <Flex justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.700" pb="3rem">
      <Flex flexDir={['column', 'row', 'row']}>
        <Box mx="2rem" my={['1rem', 0, 0]}>
          <Select
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            height="35px"
            borderRadius={20}
            fontSize="1.2rem"
            minW={['100%', '100%', '150px']}
            color="light.primary"
            borderColor="gray.700"
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            placeholder="Subject"
          >
            <option value="reading">Reading</option>
            <option value="flashCards">Flash cards</option>
          </Select>
        </Box>
        <Box mx="2rem" my={['1rem', 0, 0]}>
          <Select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            height="35px"
            borderRadius={20}
            minW={['100%', '100%', '150px']}
            fontSize="1.2rem"
            color="light.primary"
            borderColor="gray.700"
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            placeholder="Filter"
          >
            <option value="ASC">Oldest</option>
            <option value="DESC">Newest</option>
          </Select>
        </Box>
        <Box mx="2rem" my={['1rem', 0, 0]}>
          <Select
            onChange={(e) => setCompletion(e.target.value)}
            value={completion}
            height="35px"
            borderRadius={20}
            minW={['100%', '100%', '150px']}
            fontSize="1.2rem"
            color="light.primary"
            borderColor="gray.700"
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            placeholder="Completion"
          >
            <option value="true">Completed</option>
            <option value="false">Incomplete</option>
          </Select>
          <Flex justify="flex-end" mt="1rem">
            <Button onClick={resetActions} fontSize="1.2rem" colorScheme="ghost">
              Reset
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Button
          onClick={() => setNewGoalFormOpen(true)}
          height="35px"
          borderRadius={20}
          colorScheme="purple"
          minW={['100%', '100%', '150px']}
          size="lg"
          fontSize="1.2rem"
        >
          New Goal
        </Button>
      </Box>
    </Flex>
  );
};
export default MainActions;
