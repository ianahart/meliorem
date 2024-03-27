import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Input,
  Text,
  Divider,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IGroupInProgress, IInvitee, IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';
import Invitee from './Invitee';

import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient: any = null;

export interface ICreateGroupProps {
  handleCreateGroup: (userId: number, name: string) => void;
  isGroupCreated: boolean;
  handleSetIsGroupCreated: (isGroupCreated: boolean) => void;
  serverError: string;
  groupInProgress: IGroupInProgress;
  resetGroupInProgress: () => void;
}

const CreateGroup = ({
  handleCreateGroup,
  isGroupCreated,
  handleSetIsGroupCreated,
  serverError,
  groupInProgress,
  resetGroupInProgress,
}: ICreateGroupProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState('');
  const [invitees, setInvitees] = useState<IInvitee[]>([]);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const connect = () => {
    let Sock = new SockJS('https://api-meliorem-731d447a39bf.herokuapp.com/wss');
    stompClient = over(Sock);
    if (!stompClient.connected) {
      stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => console.log('connected');

  const onError = (err: any) => console.error(err);

  useEffect(() => {
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (user.id !== 0) {
      connect();
    } else {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    }
  }, [user.id]);

  const sendNotification = (userId: number, text: string, notificationType: string) => {
    if (stompClient) {
      stompClient.send('/api/v1/private-notifications', {}, JSON.stringify({ userId, text, notificationType }));
    }
  };

  const sendGroupInvite = (userId: number) => {
    const { adminId, groupId } = { ...groupInProgress };

    Client.sendGroupInvite(groupId, userId, adminId)
      .then(() => {
        sendNotification(userId, `${user.fullName} has asked you to join the group ${groupName}`, 'REQUEST');
        const updatedInvitees = [...invitees].filter((invitee) => invitee.userId !== userId);
        setInvitees(updatedInvitees);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  };

  const getInvitees = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getInvitees(
      pageNum,
      pagination.pageSize,
      pagination.direction,
      groupInProgress.adminId,
      groupInProgress.groupId
    )
      .then((res) => {
        console.log(res.data.data.items);
        const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
        setInvitees((prevState) => [...prevState, ...items]);
        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
          totalElements,
        }));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (isGroupCreated) {
      getInvitees(false);
    }
  }, [isGroupCreated]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const createGroup = () => {
    handleCreateGroup(user.id, groupName);
  };

  const validateForm = () => {
    let errors = false;
    if (groupName.trim().length === 0 || groupName.length > 200) {
      setError('Group name must be between 1 and 200 characters');
      errors = true;
    }
    return errors;
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (validateForm()) {
      return;
    }
    createGroup();
  };

  const handleOnClose = () => {
    const defaultPagination = {
      page: 0,
      pageSize: 3,
      totalPages: 0,
      direction: 'next',
      totalElements: 0,
    };

    setPagination(defaultPagination);
    handleSetIsGroupCreated(false);
    setInvitees([]);
    resetGroupInProgress();
    setGroupName('');
    setError('');
    onClose();
  };

  return (
    <Box my="2rem">
      <Button size="lg" colorScheme="purple" onClick={onOpen}>
        New group
      </Button>
      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent borderRadius={8} bg="bg.primary" minH="400px" maxWidth="650px" width={['95%', '95%', '650px']}>
          <ModalHeader fontSize="1.6rem" color="#fff">
            Create new group
          </ModalHeader>
          <ModalCloseButton onClick={handleOnClose} />
          <ModalBody>
            {serverError.length > 0 && (
              <Flex my="0.5rem">
                <Text color="red">{serverError}</Text>
              </Flex>
            )}
            {error.length > 0 && (
              <Flex my="0.5rem">
                <Text color="red">{error}</Text>
              </Flex>
            )}
            {!isGroupCreated && (
              <Flex width={['95%', '95%', '65%']}>
                <form onSubmit={handleOnSubmit} style={{ width: '100%' }}>
                  <Input
                    onChange={handleOnChange}
                    value={groupName}
                    width="100%"
                    color="#fff"
                    placeholder="Enter a group name..."
                    height="35px"
                    bg="form.primary"
                    border="none"
                    type="text"
                    name="group"
                    id="group"
                  />
                  {groupName.length > 0 && (
                    <Flex className="slide-in" justify="flex-end" my="2rem">
                      <Button type="submit" size="lg" colorScheme="purple">
                        Create
                      </Button>
                    </Flex>
                  )}
                </form>
              </Flex>
            )}
            <Divider mt="3rem" mb="1.5rem" borderColor="#302e2e" />
            <Box height="300px" overflowY="auto" className="overflow-scroll" my="2rem">
              <Flex justify="space-evenly" flexWrap="wrap">
                {invitees.map((invitee) => {
                  return <Invitee sendGroupInvite={sendGroupInvite} key={invitee.userId} data={invitee} />;
                })}
              </Flex>
              {pagination.page < pagination.totalPages - 1 && isGroupCreated && (
                <Flex my="1rem" justify="center">
                  <Button onClick={() => getInvitees(true)} colorScheme="gray">
                    More users
                  </Button>
                </Flex>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button size="lg" colorScheme="gray" mr={3} onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateGroup;
