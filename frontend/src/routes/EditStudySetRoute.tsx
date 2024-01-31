import { Box, Heading } from '@chakra-ui/react';
import Form from '../components/StudySet/Form/Form';
import { useParams } from 'react-router-dom';

const EditStudySetRoute = () => {
  const { studySetId } = useParams();

  return (
    <Box maxW="1280px" p="1rem" margin="5rem auto 2rem auto" as="section" color="primary.light">
      <Heading fontSize="3rem" as="h1">
        Edit your StudySet
      </Heading>
      <Box m="6rem auto 2rem auto" as="section">
        <Form action="edit" studySetId={studySetId as string} />
      </Box>
    </Box>
  );
};

export default EditStudySetRoute;
