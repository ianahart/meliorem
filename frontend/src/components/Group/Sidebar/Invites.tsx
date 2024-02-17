import { Box, Button, Divider, Flex, FormControl, Heading, Input, Text, useOutsideClick } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import { ISearchUser } from '../../../interfaces';
import UserAvatar from '../../Shared/UserAvatar';

export interface IInvitesProps {
  adminId: number;
  groupId: number;
}

const Invites = ({ adminId, groupId }: IInvitesProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<ISearchUser[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 2,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: ref,
    handler: () => {
      setIsDropdownOpen(false);
      setUsers([]);
    },
  });

  const preformDebounce = debounce((query) => {
    applySearch(query, false);
  }, 250);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue.length === 1) {
      setUsers([]);
    }
    debouncedSearch(searchValue);
    setSearch(searchValue);
  };

  const debouncedSearch = useCallback((query: string) => preformDebounce(query), []);

  const applySearch = (query: string, paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;

    if (query.trim().length === 0) return;
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

        if (paginate) {
          setUsers((prevState) => [...prevState, ...items]);
        } else {
          setUsers(items);
        }
        setIsDropdownOpen(items.length > 0);
      })
      .catch((err) => {
        setIsDropdownOpen(false);
        throw new Error(err.message);
      });
  };

  const handleOnInvite = (userId: number) => {
    Client.sendGroupInvite(groupId, userId, adminId)
      .then(() => {
        setIsDropdownOpen(false);
        setUsers([]);
        setSearch('');
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <Box p="0.5rem" my="1rem">
      <Heading color="#fff" fontSize="1.4rem" as="h4">
        Invite
      </Heading>
      <Box my="1rem">
        <form>
          <FormControl>
            <Input
              value={search}
              onChange={handleOnChange}
              color="#fff"
              placeholder="Search for user..."
              name="search"
              id="search"
              borderColor="gray.700"
              height="35px"
            />
          </FormControl>
        </form>
        {isDropdownOpen && (
          <Box
            ref={ref}
            p="0.25rem"
            className="overflow-scroll"
            overflowY="auto"
            boxShadow="md"
            bg="bg.dark"
            mt="0.25rem"
            height="140px"
            borderRadius={2}
            w="100%"
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
                        <Text color="#fff">{user.fullName}</Text>
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
            {pagination.page < pagination.totalPages - 1 && (
              <Flex justify="center" my="1rem">
                <Button onClick={() => applySearch(search, true)} colorScheme="gray">
                  More
                </Button>
              </Flex>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Invites;
