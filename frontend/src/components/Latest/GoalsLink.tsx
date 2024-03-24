import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { RiFlag2Line } from 'react-icons/ri';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';

const GoalsLink = () => {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <Flex justify="flex-end">
      <RouterLink to={`/${user.slug}/goals`}>
        <Flex align="center">
          <Box color="#fff" fontSize="2rem">
            <RiFlag2Line />
          </Box>
          <Heading as="h2" fontSize="2rem" ml="0.5rem" color="#fff">
            Goals
          </Heading>
        </Flex>
      </RouterLink>
    </Flex>
  );
};
export default GoalsLink;
