import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { deslugify } from '../../../util';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import { IGroupMember } from '../../../interfaces';
import UserAvatar from '../../Shared/UserAvatar';
import { useNavigate } from 'react-router-dom';

interface IMembersProps {
  groupId: number;
  groupName: string;
}

const GroupMembers = ({ groupId, groupName }: IMembersProps) => {
  const navigate = useNavigate();
  const shouldRun = useRef(true);
  const [groupMembers, setGroupMembers] = useState<IGroupMember[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const getGroupMembers = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    const accepted = 1;

    Client.getGroupMembers(groupId, accepted, pageNum, pagination.pageSize, pagination.direction)
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
        setGroupMembers((prevState) => [...prevState, ...items]);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate('/');
        }
        console.log(err.response);
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getGroupMembers(false);
    }
  }, [shouldRun.current]);

  return (
    <Box>
      <Heading color="#fff" as="h2">
        {deslugify(groupName)}
      </Heading>
      <Flex
        onClick={() => setIsDrawerOpen((prevState) => !prevState)}
        cursor="pointer"
        transition="0.2s ease-in-out"
        p="0.5rem"
        _hover={{ bg: 'gray.700' }}
        my="1rem"
        justify="space-between"
        align="center"
      >
        <Heading color="#fff" fontSize="1.4rem" as="h4">
          Members
        </Heading>
        <Box color="#fff" fontSize="1.4rem">
          {isDrawerOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Box>
      </Flex>
      {isDrawerOpen && (
        <Box
          borderRadius={2}
          p="0.25rem"
          className="slide-down overflow-scroll"
          bg="bg.dark"
          overflowY="auto"
          height="120px"
        >
          {groupMembers.map((groupMember) => {
            return (
              <Box key={groupMember.id}>
                <Flex my="0.75rem">
                  <UserAvatar
                    fontSize="1.6rem"
                    width="30px"
                    height="30px"
                    fullName={groupMember.fullName}
                    avatarUrl={groupMember.avatarUrl}
                  />
                  <Box ml="0.5rem">
                    <Text color="#fff">{groupMember.fullName}</Text>
                    <Text color="gray.400">{groupMember.schoolName}</Text>
                  </Box>
                </Flex>
                <Divider borderColor="gray.700" />
              </Box>
            );
          })}
          {pagination.page < pagination.totalPages - 1 && (
            <Flex my="0.5rem" justify="center">
              <Button onClick={() => getGroupMembers(true)} colorScheme="purple">
                More
              </Button>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GroupMembers;
