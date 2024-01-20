import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IProfileContext, IStudySetContext, IUserContext } from '../../interfaces';
import { Client } from '../../util/client';
import { useNavigate } from 'react-router-dom';
import { ListItem, Box, Text } from '@chakra-ui/react';
import { CgLogOut } from 'react-icons/cg';
import { ProfileContext } from '../../context/profile';
import { StudySetContext } from '../../context/studyset';
import { profileState, studySetFormState } from '../../data';

const Logout = () => {
  const navigate = useNavigate();
  const { tokens, logout: logoutUser } = useContext(UserContext) as IUserContext;
  const { handleSetProfile } = useContext(ProfileContext) as IProfileContext;
  const { handleSetStudySetForm } = useContext(StudySetContext) as IStudySetContext;

  const handleLogout = () => {
    Client.logout(tokens.refreshToken)
      .then(() => {
        logoutUser();
        handleSetProfile(profileState);
        handleSetStudySetForm(studySetFormState);

        navigate('/login');
      })
      .catch((err: any) => {
        throw new Error(err.response.data.message);
      });
  };

  return (
    <ListItem
      cursor="pointer"
      _hover={{ backgroundColor: '#3f3f3f' }}
      my="1rem"
      p="1rem"
      fontSize="1.4rem"
      display="flex"
      alignItems="center"
      color="primary.light"
      onClick={handleLogout}
    >
      <Box mr="0.5rem">
        <CgLogOut />
      </Box>
      <Text>Logout</Text>
    </ListItem>
  );
};

export default Logout;
