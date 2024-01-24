import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import SettingsTitle from '../SettingsTitle';
import SettingsContent from '../SettingsContent';
import SettingsContainer from '../SettingsContainer';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import UserAvatar from '../../Shared/UserAvatar';
import { nanoid } from 'nanoid';
import { Client } from '../../../util/client';
import ProfilePictureUpload from './ProfilePictureUpload';

const ProfilePicture = () => {
  const { user, updateUser } = useContext(UserContext) as IUserContext;
  const avatars = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
      (num) => `https://robohash.org/${num}`
    );
  }, []);

  const selectAvatar = (avatar: string) => {
    Client.updateProfileAvatar(avatar, user.profileId)
      .then((res) => {
        updateUser({ ...user, avatarUrl: res.data.avatarUrl });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <SettingsContainer>
      <SettingsTitle>
        <Box color="#fff" fontSize="3rem">
          <UserAvatar
            fontSize="2.5rem"
            avatarUrl={user.avatarUrl}
            fullName={user.fullName}
            width="60px"
            height="60px"
          />
        </Box>
        <Heading as="h4">Profile Picture</Heading>
      </SettingsTitle>
      <SettingsContent>
        <Heading fontSize="2rem" as="h2">
          Choose your profile picture
        </Heading>
        <Box my="1.5rem">
          <Flex flexWrap="wrap" width={['100%', '100%', '75%']}>
            {avatars.map((link) => {
              return (
                <Flex
                  onClick={() => selectAvatar(link)}
                  height="70px"
                  width="70px"
                  borderRadius={50}
                  flexDir="column"
                  align="center"
                  justify="center"
                  bg={user.avatarUrl === link ? 'primary.dark' : 'rgba(0,0,0,0.7)'}
                  boxShadow="md"
                  cursor="pointer"
                  m="1rem"
                  key={nanoid()}
                >
                  <Image
                    width="50px"
                    height="50px"
                    src={link}
                    alt="a generated robot from robohash"
                  />
                </Flex>
              );
            })}
          </Flex>
          <Flex
            flexDir="column"
            align="center"
            justify="center"
            position="relative"
            m="3rem 0 2rem 0"
          >
            <Box height="2px" width="100%" bg="white"></Box>
            <Flex
              position="absolute"
              width="100px"
              justify="center"
              borderRadius={2}
              p="0.5rem"
              background="#bab6b6"
            >
              <Text
                textAlign="center"
                color="text.secondary"
                fontSize="2rem"
                textTransform="uppercase"
              >
                Or
              </Text>
            </Flex>
          </Flex>
          <Box my="5rem">
            <ProfilePictureUpload />
          </Box>
        </Box>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default ProfilePicture;
