import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { IGoal, IUserContext } from '../../interfaces';
import { IoBookSharp } from 'react-icons/io5';
import { PiCardsFill } from 'react-icons/pi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user';

export interface IGoalProps {
  data: IGoal;
}

const Goal = ({ data }: IGoalProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;

  const showGoalDetails = () => {
    navigate(`/${user.slug}/goals/${data.id}`);
  };

  return (
    <RouterLink to={`/${user.slug}/goals/${data.id}`}>
      <Box
        onClick={showGoalDetails}
        cursor="pointer"
        p="2rem"
        borderTop="1px solid"
        borderColor="gray.700"
        _hover={{ bg: 'rgba(0, 0,0,0.5)' }}
      >
        <Flex>
          <Flex
            flexDir="column"
            align="center"
            justify="center"
            borderRadius={50}
            bg="light.primary"
            height="35px"
            width="35px"
            mr="3rem"
          >
            <Box fontSize="2rem">{data.goalType === 'READING' ? <IoBookSharp /> : <PiCardsFill />}</Box>
          </Flex>
          <Box>
            <Heading fontSize="1.4rem" color="light.primary" as="h4">
              {data.goalTitle}
            </Heading>
            <Text mt="1rem" color="gray.400">
              {data.goalType.slice(0, 1).toUpperCase() + data.goalType.slice(1).toLowerCase()}
            </Text>
          </Box>
        </Flex>
      </Box>
    </RouterLink>
  );
};

export default Goal;
