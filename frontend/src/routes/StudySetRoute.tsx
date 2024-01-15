import { Box, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { StudySetContext } from '../context/studyset';
import { IStudySetContext } from '../interfaces';

const StudySetRoute = () => {
  const { studySetForm, setStudySetForm } = useContext(
    StudySetContext
  ) as IStudySetContext;
  return (
    <Box
      maxW="1280px"
      p="1rem"
      border="1px solid white"
      margin="5rem auto 2rem auto"
      as="section"
      color="primary.light"
    >
      <Heading fontSize="3rem" as="h1">
        Create a new study set
      </Heading>
    </Box>
  );
};

export default StudySetRoute;
