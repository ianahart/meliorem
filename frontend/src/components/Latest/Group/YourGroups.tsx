import { Box, Flex, Heading } from '@chakra-ui/react';
import CreateGroup from './CreateGroup';
import { useState } from 'react';
import { Client } from '../../../util/client';

interface IServerError {
  message: string;
  name: string;
}

const YourGroups = () => {
  const [isGroupCreated, setIsGroupCreated] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSetServerErrors = <T extends IServerError>(data: T) => {
    for (let prop in data) {
      setServerError(data[prop] as string);
    }
  };

  const handleCreateGroup = (userId: number, name: string) => {
    setServerError('');
    Client.createGroup(userId, name)
      .then((res) => {
        console.log(res);
        handleSetIsGroupCreated(true);
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
        />
      </Box>
    </Box>
  );
};
export default YourGroups;
