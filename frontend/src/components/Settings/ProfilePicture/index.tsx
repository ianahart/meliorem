import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { LuSchool } from 'react-icons/lu';
import SettingsTitle from '../SettingsTitle';
import SettingsContent from '../SettingsContent';
import SettingsContainer from '../SettingsContainer';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import UserAvatar from '../../Shared/UserAvatar';
import { nanoid } from 'nanoid';
import { Client } from '../../../util/client';

const ProfilePicture = () => {
  const { user, updateUser } = useContext(UserContext) as IUserContext;
  const avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
        <Heading as="h4">Profile Picutre</Heading>
      </SettingsTitle>
      <SettingsContent>
        <Heading fontSize="2rem" as="h2">
          Choose your profile picture
        </Heading>
        <Box my="1.5rem">
          <Flex flexWrap="wrap" width={['100%', '100%', '75%']}>
            {avatars.map((num) => {
              return (
                <Flex
                  onClick={() => selectAvatar(`https://robohash.org/${num}`)}
                  height="70px"
                  width="70px"
                  borderRadius={50}
                  flexDir="column"
                  align="center"
                  justify="center"
                  bg="primary.dark"
                  boxShadow="md"
                  cursor="pointer"
                  m="1rem"
                  key={nanoid()}
                >
                  <Image
                    width="50px"
                    height="50px"
                    src={`https://robohash.org/${num}`}
                    alt="a generated robot from robohash"
                  />
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default ProfilePicture;
