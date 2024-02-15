import { Box, Flex, Heading } from '@chakra-ui/react';
import CreateGroup from './CreateGroup';
import { useState } from 'react';
import { Client } from '../../../util/client';
import { IMinGroup } from '../../../interfaces';

interface IServerError {
  message: string;
  name: string;
}

const YourGroups = () => {
  const [isGroupCreated, setIsGroupCreated] = useState(false);
  const [groups, setGroups] = useState<IMinGroup[]>([]);
  const [serverError, setServerError] = useState('');
  const [groupInProgress, setGroupInProgress] = useState({
    adminId: 0,
    groupId: 0,
  });

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
        handleSetIsGroupCreated(true);
        setGroupInProgress({ adminId: data.adminId, groupId: data.id });
      })
      .catch((err) => {
        console.log(err);
        handleSetServerErrors(err.response.data);
        throw new Error(err);
      });
  };

  const handleSetIsGroupCreated = (isCreated: boolean) => {
    setIsGroupCreated(isCreated);
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
        <CreateGroup
          serverError={serverError}
          isGroupCreated={isGroupCreated}
          handleSetIsGroupCreated={handleSetIsGroupCreated}
          handleCreateGroup={handleCreateGroup}
          resetGroupInProgress={resetGroupInProgress}
          groupInProgress={groupInProgress}
        />
      </Box>
    </Box>
  );
};
export default YourGroups;
