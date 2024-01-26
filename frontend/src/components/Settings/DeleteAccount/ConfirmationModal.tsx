import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Box,
  Text,
  Flex,
  Input,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useContext, useMemo, useState } from 'react';
import { Client } from '../../../util/client';
import { UserContext } from '../../../context/user';
import { IProfileContext, IStudySetContext, IUserContext } from '../../../interfaces';
import { ProfileContext } from '../../../context/profile';
import { StudySetContext } from '../../../context/studyset';
import { profileState, studySetFormState } from '../../../data';
import { useNavigate } from 'react-router-dom';

interface IConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal = ({ isOpen, onClose }: IConfirmationModalProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const { user, logout } = useContext(UserContext) as IUserContext;
  const { handleSetProfile } = useContext(ProfileContext) as IProfileContext;
  const { handleSetStudySetForm } = useContext(StudySetContext) as IStudySetContext;

  const username = useMemo(
    () => user.fullName.split(' ').join('').toLowerCase().split(''),
    [name]
  );

  const cleanUp = () => {
    logout();
    handleSetProfile(profileState);
    handleSetStudySetForm(studySetFormState);
    navigate('/login');
  };

  const deleteAccount = () => {
    if (username.join('') !== inputValue) {
      return;
    }

    Client.deleteAccount(user.id)
      .then(() => {
        onClose();
        cleanUp();
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="bg.primary" maxW={['100%', '100%', '550px']} minH="300px">
          <ModalHeader color="#fff">Delete your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              fontSize="1.2rem"
              color="#fff"
              p="1rem"
              bg="form.primary"
              minH="120px"
              borderRadius={8}
            >
              <Text>Are you sure you want to delete your account?</Text>
              <Flex flexDir="column" my="1.5rem">
                <Text>
                  Please type your name
                  <Box as="span" ml="0.3rem">
                    {username.map((letter, index) => {
                      return (
                        <Box
                          color={inputValue[index] === letter ? 'primary.dark' : '#fff'}
                          key={nanoid()}
                          as="span"
                          fontWeight={inputValue[index] === letter ? 'bold' : 'normal'}
                        >
                          {letter}
                        </Box>
                      );
                    })}
                  </Box>
                </Text>
                <Input
                  onChange={(e) => setInputValue(e.target.value)}
                  my="1.5rem"
                  border="none"
                  borderRadius={0}
                  placeholder="Type here..."
                  fontSize="1.2rem"
                  _placeholder={{ fontSize: '1.2rem' }}
                  borderBottom="2px solid #fff"
                  type="text"
                />
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            {inputValue === username.join('') && (
              <Button onClick={deleteAccount} colorScheme="red" mr={3}>
                Delete account
              </Button>
            )}
            <Button onClick={onClose} colorScheme="gray">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
