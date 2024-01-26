import { Box } from '@chakra-ui/react';
import SchoolInfo from '../components/Settings/SchoolInfo';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/user';
import { IProfileContext, IUserContext } from '../interfaces';
import { Client } from '../util/client';
import { ProfileContext } from '../context/profile';
import ProfilePicture from '../components/Settings/ProfilePicture';
import UpdateEmail from '../components/Settings/UpdateEmail';
import DeleteAccount from '../components/Settings/DeleteAccount';

const SettingsRoute = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const { handleSetInitialProfile } = useContext(ProfileContext) as IProfileContext;
  const shouldRun = useRef(true);

  const getProfile = (profileId: number) => {
    Client.getProfile(profileId)
      .then((res) => {
        handleSetInitialProfile(res.data.profile);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.profileId !== 0) {
      shouldRun.current = false;
      getProfile(user.profileId);
    }
  }, [shouldRun.current, user.profileId]);

  return (
    <Box color="#fff">
      <Box
        as="section"
        minH="100vh"
        maxWidth="1280px"
        width="100%"
        margin="6rem auto 1rem auto"
        padding="1rem"
      >
        <Box m="2rem 0" as="section">
          <SchoolInfo />
        </Box>
        <Box m="2rem 0" as="section">
          <ProfilePicture />
        </Box>
        <Box m="2rem 0" as="section">
          <UpdateEmail />
        </Box>
        <Box m="2rem 0" as="section">
          <DeleteAccount />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsRoute;
