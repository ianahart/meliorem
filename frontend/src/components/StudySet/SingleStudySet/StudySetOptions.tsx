import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { IStudySet, IUserContext } from '../../../interfaces';
import { IoShareOutline } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';

export interface IStudySetOptionsProps {
  studySet: IStudySet;
}

const StudySetOptions = ({ studySet }: IStudySetOptionsProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;

  const goToEditStudySet = () => {
    navigate(`/studysets/${studySet.id}/edit`);
  };

  return (
    <Flex justify="space-around">
      {/*Share Icon*/}
      <Flex
        minW="30px"
        mx="0.5rem"
        cursor="pointer"
        align="center"
        border="1px solid #fff"
        p="0.25rem"
        borderRadius={2}
      >
        <Box fontSize="1.4rem" mr="0.25rem">
          <IoShareOutline />
        </Box>
        <Text>Share</Text>
      </Flex>
      {/*End Share Icon*/}
      {/*Edit Icon*/}
      {user.id === studySet.userId && (
        <Tooltip label="Edit">
          <Flex
            onClick={goToEditStudySet}
            minW="30px"
            flexDir="column"
            justify="center"
            mx="0.5rem"
            cursor="pointer"
            align="center"
            border="1px solid #fff"
            p="0.25rem"
            borderRadius={2}
          >
            <Box fontSize="1.4rem">
              <MdOutlineEdit />
            </Box>
          </Flex>
        </Tooltip>
      )}
      {/*End Edit Icon*/}
      {/*Dots Icon*/}
      <Flex
        minW="30px"
        flexDir="column"
        justify="center"
        mx="0.5rem"
        cursor="pointer"
        align="center"
        border="1px solid #fff"
        p="0.25rem"
        borderRadius={2}
      >
        <Box fontSize="1.4rem">
          <BsThreeDots />
        </Box>
      </Flex>

      {/*End Dots Icon*/}
    </Flex>
  );
};

export default StudySetOptions;
