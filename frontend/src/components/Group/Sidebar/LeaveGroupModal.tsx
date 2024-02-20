import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IGroupMember, IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';
import UserAvatar from '../../Shared/UserAvatar';
import { AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export interface ILeaveGroupModalProps {
  groupId: number;
  adminId: number;
  handleSetIsModalOpen: (open: boolean) => void;
}

const LeaveGroupModal = ({ groupId, adminId, handleSetIsModalOpen }: ILeaveGroupModalProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const [newAdminId, setNewAdminId] = useState(0);
  const shouldRun = useRef(true);
  const [groupMembers, setGroupMembers] = useState<IGroupMember[]>([]);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const isAdmin = user.id !== 0 && user.id === adminId;

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
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id) {
      shouldRun.current = false;
      getGroupMembers(false);
    }
  }, [shouldRun.current, user.id]);

  const deleteGroup = (groupId: number) => {
    Client.deleteGroup(groupId)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const replaceAdmin = (newAdminId: number, groupId: number, oldAdminId: number) => {
    Client.updateGroup(newAdminId, groupId, oldAdminId)
      .then(() => {
        navigate('/', { state: { adminId: newAdminId, groupId: groupId } });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const leaveGroup = (memberUserId: number) => {
    const groupMember = [...groupMembers].find((groupMember) => groupMember.userId === memberUserId);

    if (groupMember === undefined) {
      return;
    }

    Client.ignoreInvite(groupMember.id)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleOnLeaveGroup = () => {
    const adminAndNotOnlyMember = isAdmin && groupMembers.length >= 2;
    const adminAndOnlyMember = isAdmin && groupMembers.length === 1;

    setError('');

    if (adminAndNotOnlyMember) {
      if (newAdminId === 0) {
        setError('Please select an admin to replace you');
        return;
      }
      replaceAdmin(newAdminId, groupId, user.id);
    } else if (adminAndOnlyMember) {
      deleteGroup(groupId);
    } else {
      leaveGroup(user.id);
    }
    handleSetIsModalOpen(false);
  };

  const onNewAdminId = (newAdminId: number) => {
    setNewAdminId(newAdminId);
  };

  return (
    <Flex
      justify="center"
      flexDir="column"
      align="center"
      position="absolute"
      top="0"
      left="0"
      width="100%"
      zIndex={2}
      height="100%"
      bg="rgba(0, 0, 0, 0.75)"
    >
      <Box
        p="1rem"
        boxShadow="md"
        bg="bg.primary"
        minH="100px"
        maxW="550px"
        w={['95%', '95%', '550px']}
        borderRadius={8}
      >
        <Flex mb="2rem">
          <Heading fontSize="1.8rem" as="h2">
            Leave group
          </Heading>
        </Flex>
        <Flex flexDir="column" justify="space-between">
          <Box>
            <Text>Are you sure you want to leave this group?</Text>
            <Text mt="1rem">
              You will no longer have access to this group including the group's chat messages and study sets. This
              group wil no longer appear inside your groups on the home page.
            </Text>
            {isAdmin && groupMembers.length >= 2 && (
              <Text fontWeight="bold" mt="1rem">
                You must choose someone to replace you as admin
              </Text>
            )}
            {error.length > 0 && (
              <Flex my="1rem">
                <Text color="red.500">{error}</Text>
              </Flex>
            )}
          </Box>
          {isAdmin && (
            <Box className="overflow-scroll" height="120px" overflowY="auto">
              {groupMembers.map((groupMember) => {
                return (
                  <Flex
                    w="100%"
                    bg={newAdminId === groupMember.userId ? 'green.700' : 'inherit'}
                    key={groupMember.id}
                    my="1rem"
                  >
                    <Box>
                      <UserAvatar
                        width="35px"
                        height="35px"
                        avatarUrl={groupMember.avatarUrl}
                        fullName={groupMember.fullName}
                        fontSize="1.6rem"
                      />
                    </Box>
                    <Box ml="0.5rem">
                      <Text>{groupMember.fullName}</Text>
                      {newAdminId === groupMember.userId && (
                        <Flex align="center" justify="space-between">
                          <Flex align="center">
                            <Box mr="0.25rem">
                              <AiOutlineCheck />
                            </Box>
                            <Text color="#fff">Admin selected</Text>
                          </Flex>
                          <Box>
                            <Button ml="0.5rem" onClick={() => setNewAdminId(0)} size="sm">
                              Unselect
                            </Button>
                          </Box>
                        </Flex>
                      )}
                      {groupMember.userId !== adminId && newAdminId === 0 && (
                        <Button onClick={() => onNewAdminId(groupMember.userId)} size="sm">
                          Replace as admin
                        </Button>
                      )}
                    </Box>
                  </Flex>
                );
              })}
              {pagination.page < pagination.totalPages - 1 && (
                <Flex justify="center" my="1rem">
                  <Button colorScheme="purple" onClick={() => getGroupMembers(true)}>
                    More members
                  </Button>
                </Flex>
              )}
            </Box>
          )}
          <Flex my="2rem" justify="flex-end">
            <Button onClick={() => handleSetIsModalOpen(false)} mx="0.25rem" colorScheme="gray">
              Back
            </Button>
            <Button onClick={handleOnLeaveGroup} mx="0.25rem" colorScheme="purple">
              Leave
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LeaveGroupModal;
