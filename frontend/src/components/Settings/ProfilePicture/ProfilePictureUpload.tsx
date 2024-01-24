import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';

type TProfilePicture = File | null;

const ProfilePictureUpload = () => {
  const { user, updateUser } = useContext(UserContext) as IUserContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDragging, setIsDragging] = useState(false);
  const [profilePicture, setProfilePicture] = useState<TProfilePicture>(null);
  const [error, setError] = useState('');

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(false);
  };

  const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setError('');
    setProfilePicture(null);
    setIsDragging(true);
  };

  const validateFileSize = (file: File) => {
    let exceedsFileSize = false;
    if (file.size > 2000000) {
      exceedsFileSize = true;
    }
    return exceedsFileSize;
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (!files) return;

    if (validateFileSize(files[0])) {
      setError('Profile picture exceeds 2MB limit');
      return;
    }
    setProfilePicture(files[0]);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files === null) return;

    const file = e.target.files[0];

    if (validateFileSize(file)) {
      setError('Profile picture exceeds 2MB limit');
      return;
    }
    setProfilePicture(file);
  };

  const handleOnClickUpload = () => {
    if (profilePicture !== null) {
      uploadProfilePicture();
      onClose();
    }
  };

  const uploadProfilePicture = () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture as File);
    Client.updateProfilePicture(formData, user.profileId)
      .then((res) => {
        const updatedUser = { ...user, avatarUrl: res.data.avatarUrl };
        updateUser(updatedUser);

        setProfilePicture(null);
        onClose();
      })

      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err);
      });
  };

  return (
    <Box>
      <Flex justify="center">
        <Button onClick={onOpen} size="lg" colorScheme="purple">
          Upload Picture
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="bg.primary" maxW={['100%', '100%', '550px']}>
          <ModalHeader color="#fff" fontSize="2rem">
            Upload profile picture
          </ModalHeader>
          <ModalCloseButton color="#fff" />
          <ModalBody>
            <Flex p="1rem" justify="center" flexDir="column" align="center">
              <Flex
                bg="rgba(0,0,0,0.7)"
                justify="center"
                align="center"
                flexDir="column"
                minH="140px"
                border="1px dashed #fff"
                width="100%"
                borderRadius={2}
                maxW="220px"
              >
                <Flex
                  draggable
                  onDragEnter={handleOnDragEnter}
                  onDragLeave={handleOnDragLeave}
                  onDrop={handleOnDrop}
                  flexDir="column"
                  align="center"
                  justify="center"
                  p="0.25rem"
                  minH="120px"
                  borderRadius={2}
                  border="1px dashed #fff"
                  w="100%"
                  maxWidth="200px"
                  position="relative"
                >
                  {isDragging && error.length === 0 && !profilePicture ? (
                    <Box fontSize="2.5rem" color="#fff">
                      <BiUpload />
                    </Box>
                  ) : (
                    <Text color="#fff">{error.length > 0 ? error : 'Drag & Drop'}</Text>
                  )}
                  {profilePicture !== null && (
                    <Text color="#fff">{profilePicture.name}</Text>
                  )}
                  <Input
                    onChange={handleOnChange}
                    accept="image/*"
                    pos="absolute"
                    height="100%"
                    width="100%"
                    id="upload"
                    name="upload"
                    type="file"
                    zIndex={10}
                    opacity={0}
                  />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleOnClickUpload} mx="0.5rem" colorScheme="purple">
              Upload
            </Button>
            <Button mx="0.5rem" colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePictureUpload;
