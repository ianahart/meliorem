import { useContext, useEffect, useRef, useState } from 'react';

import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { UserContext } from '../../../context/user';
import { IInvite, IMinGroup, IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';
import Invite from './Invite';

export interface IYourInvitesProps {
  handleAddGroup: (group: IMinGroup) => void;
}

const YourInvites = ({ handleAddGroup }: IYourInvitesProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [invites, setInvites] = useState<IInvite[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const joinGroup = (groupMemberId: number, isAccepted: boolean, groupId: number) => {
    Client.joinGroup(groupMemberId, isAccepted, groupId)
      .then((res) => {
        handleAddGroup(res.data.data);
        setInvites((prevState) => prevState.filter((invite) => invite.groupMemberId !== groupMemberId));
        toast({
          title: 'Group joined.',
          description: 'You have successfully joined a new group',
          status: 'success',
          duration: 5500,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  };

  const getInvites = (paginate: boolean) => {
    const isAccepted = 0;
    const pageNum = paginate ? pagination.page : -1;
    Client.getGroupInvites(isAccepted, pageNum, pagination.pageSize, pagination.direction, user.id)
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
        setInvites((prevState) => [...prevState, ...items]);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getInvites(false);
    }
  }, [shouldRun.current, user.id]);

  return (
    <>
      <Button colorScheme="purple" size="lg" onClick={onOpen}>
        Your invites
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="bg.primary" minH="300px" w="100%" maxW={['95%', '95%', '550px']}>
          <ModalHeader fontSize="1.6rem" color="#fff">
            Your invites
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="300px" overflowY="auto" className="overflow-scroll" my="2rem">
              <Flex justify="space-evenly" flexWrap="wrap">
                {invites.map((invite) => {
                  return <Invite key={invite.groupMemberId} data={invite} joinGroup={joinGroup} />;
                })}
              </Flex>
              {pagination.page < pagination.totalPages - 1 && (
                <Flex my="1rem" justify="center">
                  <Button onClick={() => getInvites(true)} colorScheme="gray">
                    More users
                  </Button>
                </Flex>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button size="lg" colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default YourInvites;
