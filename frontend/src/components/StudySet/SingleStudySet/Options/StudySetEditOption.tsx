import { Box, Flex, Tooltip } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export interface IStudySetEditOptionProps {
  studySetId: number;
}

const StudySetEditOption = ({ studySetId }: IStudySetEditOptionProps) => {
  const navigate = useNavigate();
  const goToEditStudySet = () => {
    navigate(`/studysets/${studySetId}/edit`);
  };

  return (
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
  );
};

export default StudySetEditOption;
