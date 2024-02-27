import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Client } from '../../../util/client';
import { ISearchUser, IUserContext } from '../../../interfaces';
import UserAvatar from '../../Shared/UserAvatar';
import { UserContext } from '../../../context/user';
import DebouncedForm from './DebouncedForm';

export interface IInvitesProps {
  adminId: number;
  groupId: number;
}

const Invites = ({ adminId, groupId }: IInvitesProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const [inviteError, setInviteError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState<ISearchUser[]>([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const getData = (pageNum: number, paginate: boolean, query: string) => {
    setSearch(query);
    Client.searchUsers(query, groupId, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
          totalElements,
        }));

        setIsDropdownOpen(items.length > 0);
        if (paginate) {
          setUsers((prevState) => [...prevState, ...items]);
        } else {
          setUsers(items);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const clearCollection = () => setUsers([]);

  const handleOnInvite = (userId: number) => {
    setInviteError('');
    setPagination({ ...pagination });

    if (user.id !== adminId) {
      setInviteError('Only an admin can send out invites in this group');
      return;
    }

    Client.sendGroupInvite(groupId, userId, adminId)
      .then(() => {
        setUsers([]);
        setSearch('');
        setPagination({ page: 0, pageSize: 3, totalPages: 0, direction: 'next', totalElements: 0 });
        setIsDropdownOpen(false);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <Box p="0.5rem" my="1rem">
      <DebouncedForm
        isDropdownOpen={isDropdownOpen}
        handleSetIsDropdownOpen={setIsDropdownOpen}
        getData={getData}
        handleSetPagination={setPagination}
        placeholder="Search for user..."
        pagination={pagination}
        heading="Invite"
        clearCollection={clearCollection}
        handleSetError={setInviteError}
        error={inviteError}
      >
        {users.map((user) => {
          return (
            <Box p="0.5rem" my="1rem" key={user.id} cursor="pointer" _hover={{ bg: 'gray.700' }}>
              <Flex justify="space-between" align="center">
                <Flex>
                  <UserAvatar
                    height="30px"
                    width="30px"
                    fullName={user.fullName}
                    avatarUrl={user.avatarUrl}
                    fontSize="1.6rem"
                  />
                  <Box ml="0.25rem">
                    {user.fullName.split('').map((char, index) => {
                      return (
                        <Box
                          key={index}
                          color={search.toLowerCase().includes(char.toLowerCase()) ? 'primary.dark' : '#fff'}
                          as="span"
                        >
                          {char}
                        </Box>
                      );
                    })}
                    <Text fontSize="0.85rem" color="gray.400">
                      {user.schoolName}
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Button onClick={() => handleOnInvite(user.id)} variant="outline" colorScheme="purple">
                    Invite
                  </Button>
                </Box>
              </Flex>
              <Divider my="0.25rem" borderColor="gray.700" />
            </Box>
          );
        })}
      </DebouncedForm>
    </Box>
  );
};

export default Invites;
