import { Box, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import CreateGroup from './CreateGroup';
import { useContext, useEffect, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import { IMinGroup, IUserContext } from '../../../interfaces';
import { UserContext } from '../../../context/user';
import { FaArrowLeft, FaArrowRight, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import YourInvites from './YourInvites';
import slugify from 'slugify';

interface IServerError {
  message: string;
  name: string;
}

const YourGroups = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [isGroupCreated, setIsGroupCreated] = useState(false);
  const [groups, setGroups] = useState<IMinGroup[]>([]);
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [serverError, setServerError] = useState('');
  const [groupInProgress, setGroupInProgress] = useState({
    adminId: 0,
    groupId: 0,
  });
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  useEffect(() => {
    if (isMobile) {
      setIsMouseOver(true);
    } else {
      setIsMouseOver(false);
    }
  }, [isMobile]);

  const getGroups = (paginate: boolean, direction: string) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getGroups(pageNum, pagination.pageSize, direction, user.id)
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
        setGroups(items);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleOnMouseEnter = () => setIsMouseOver(true);

  const handleOnMouseLeave = () => setIsMouseOver(false);

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getGroups(false, 'next');
    }
  }, [shouldRun.current, user.id]);

  const handleSetServerErrors = <T extends IServerError>(data: T) => {
    for (let prop in data) {
      setServerError(data[prop] as string);
    }
  };

  const resetGroupInProgress = () => {
    const groupInProgress = { adminId: 0, groupId: 0 };
    setGroupInProgress(groupInProgress);
  };

  const handleCreateGroup = (userId: number, name: string) => {
    setServerError('');
    Client.createGroup(userId, name)
      .then((res) => {
        const { data } = res.data;
        handleAddGroup(data);
        handleSetIsGroupCreated(true);
        setGroupInProgress({ adminId: data.adminId, groupId: data.id });
      })
      .catch((err) => {
        handleSetServerErrors(err.response.data);
        throw new Error(err);
      });
  };

  const handleSetIsGroupCreated = (isCreated: boolean) => {
    setIsGroupCreated(isCreated);
  };

  const goToGroup = (group: IMinGroup) => {
    navigate(`/groups/${slugify(group.name)}`, { state: { groupId: group.id, adminId: group.adminId } });
  };

  const handleAddGroup = (group: IMinGroup) => {
    setGroups((prevState) => [...prevState, group]);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems={['center', 'center', 'flex-start']}
      as="section"
    >
      <Box display="flex" flexDir="column" alignItems="flex-start">
        <Flex align="center">
          <Heading as="h2" fontSize="2rem" color="#fff">
            Your Groups
          </Heading>
        </Flex>
        <Flex align="center">
          <Box mr="0.5rem">
            <CreateGroup
              serverError={serverError}
              isGroupCreated={isGroupCreated}
              handleSetIsGroupCreated={handleSetIsGroupCreated}
              handleCreateGroup={handleCreateGroup}
              resetGroupInProgress={resetGroupInProgress}
              groupInProgress={groupInProgress}
            />
          </Box>
          <Box ml="0.5rem">
            <YourInvites handleAddGroup={handleAddGroup} />
          </Box>
        </Flex>
        <Flex
          position="relative"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          align="center"
          my="1rem"
          minH="120px"
          width={['95%', '95%', '80%']}
          maxWidth="760px"
          overflowX="auto"
          overflowY="hidden"
          borderRadius={8}
          flexWrap={['wrap', 'wrap', 'nowrap']}
        >
          {pagination.page > 0 && isMouseOver && (
            <Box
              onClick={() => getGroups(true, 'prev')}
              color="#fff"
              bg="gray.500"
              width="32px"
              height="32px"
              borderRadius={50}
              display="flex"
              flexDir="column"
              alignItems="center"
              left="0"
              justifyContent="center"
              position="absolute"
              fontSize="1.6rem"
            >
              <FaArrowLeft />
            </Box>
          )}

          {pagination.page < pagination.totalPages - 1 && isMouseOver && (
            <Box
              onClick={() => getGroups(true, 'next')}
              color="#fff"
              bg="gray.500"
              width="32px"
              height="32px"
              borderRadius={50}
              display="flex"
              flexDir="column"
              alignItems="center"
              right="105px"
              justifyContent="center"
              position="absolute"
              fontSize="1.6rem"
            >
              <FaArrowRight />
            </Box>
          )}

          {groups.map((group) => {
            return (
              <Flex
                onClick={() => goToGroup(group)}
                cursor="pointer"
                flexDir="column"
                justify="space-between"
                color="#fff"
                mx="1rem"
                p="1rem"
                my={['1rem', '1rem', '0']}
                bg="form.primary"
                width={['100%', '100%', '200px']}
                boxShadow="md"
                borderRadius={8}
                minH="120px"
                borderBottom="1px solid"
                borderBottomColor="form.primary"
                as="section"
                _hover={{ borderBottomColor: 'primary.dark' }}
                key={group.id}
              >
                <Flex align="center">
                  <Box color="gray.500" mr="0.5rem" fontSize="1.6rem">
                    <FaUsers />
                  </Box>
                  <Text fontWeight="bold" fontSize="1.6rem" wordBreak="break-all">
                    {group.name}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};
export default YourGroups;
