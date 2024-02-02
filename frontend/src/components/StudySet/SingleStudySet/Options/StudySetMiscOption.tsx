import { Flex, Box } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

interface IStudySetMiscOptionProps {
  studySetId: number;
  ownerId: number;
}

const StudySetMiscOption = ({ studySetId, ownerId }: IStudySetMiscOptionProps) => {
  return (
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
  );
};

export default StudySetMiscOption;
