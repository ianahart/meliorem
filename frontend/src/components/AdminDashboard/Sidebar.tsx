import { Box, Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import UserAvatar from '../Shared/UserAvatar';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
import { BsChevronRight } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useContext(UserContext) as IUserContext;

  return (
    <Box p="0.5rem" my="2rem" minH="800px" borderRight="1px solid">
      <Box>
        <RouterLink to="/admin/dashboard">
          <Heading textAlign="center" color="light.primary">
            Meliorem
          </Heading>
        </RouterLink>
      </Box>
      <Box my="2rem">
        <Flex>
          <Box>
            <UserAvatar
              fontSize="1.6rem"
              avatarUrl={user.avatarUrl}
              fullName={user.fullName}
              width="45px"
              height="45px"
            />
            <Text mt="0.5rem" color="gray.400">
              Admin
            </Text>
          </Box>
          <Box ml="0.5rem" color="light.primary">
            <Text fontSize="1.2rem">{user.fullName}</Text>
            <Text fontWeight="bold">{user.email}</Text>
          </Box>
        </Flex>
      </Box>

      <Box my="3rem">
        <UnorderedList fontSize="1.4rem" listStyleType="none" color="light.primary">
          <ListItem my="2rem">
            <RouterLink to="books/create">
              <Flex align="center" justify="space-between">
                <Text>Create textbook</Text>
                <BsChevronRight />
              </Flex>
            </RouterLink>
          </ListItem>
          <ListItem my="2rem">
            <RouterLink to="books">
              <Flex align="center" justify="space-between">
                <Text>Textbooks</Text>
                <BsChevronRight />
              </Flex>
            </RouterLink>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Sidebar;
