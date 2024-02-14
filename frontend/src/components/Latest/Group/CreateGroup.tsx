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
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';

export interface ICreateGroupProps {
  handleCreateGroup: (userId: number, name: string) => void;
  isGroupCreated: boolean;
  handleSetIsGroupCreated: (isGroupCreated: boolean) => void;
  serverError: string;
}

const CreateGroup = ({
  handleCreateGroup,
  isGroupCreated,
  handleSetIsGroupCreated,
  serverError,
}: ICreateGroupProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

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

    //if (validateForm()) {
    // return;
    // }
    createGroup();
  };

  const handleOnClose = () => {
    handleSetIsGroupCreated(false);
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
