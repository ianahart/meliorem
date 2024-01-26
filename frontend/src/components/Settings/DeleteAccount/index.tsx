import { Box, Heading, Text, Flex, Button, useDisclosure } from '@chakra-ui/react';
import SettingsTitle from '../SettingsTitle';
import SettingsContent from '../SettingsContent';
import SettingsContainer from '../SettingsContainer';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import ConfirmationModal from './ConfirmationModal';

const DeleteAccount = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <SettingsContainer>
      <SettingsTitle>
        <Box color="#fff" fontSize="3rem">
          <AiOutlineClose />
        </Box>
        <Heading textAlign="center" as="h4">
          Delete Account
        </Heading>
      </SettingsTitle>
      <SettingsContent>
        <Flex minH="100%" flexDir="column" justify="space-between">
          <Box>
            <Heading fontSize="2rem" as="h2">
              Permanently delete {user.fullName}
            </Heading>
            <Box my="1.5rem">
              <Text fontSize="1.2rem">
                This will delete all your data and cannot be undone - becareful
              </Text>
            </Box>
          </Box>
          <Box>
            <Button onClick={onOpen} size="lg" colorScheme="red">
              Delete account
            </Button>
            <ConfirmationModal isOpen={isOpen} onClose={onClose} />
          </Box>
        </Flex>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default DeleteAccount;
