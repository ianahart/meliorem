import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import SingleStudySet from '../components/StudySet/SingleStudySet';

const SingleStudySetRoute = () => {
  let studySetId = useParams().studySetId as string;

  return (
    <Box as="section" minH="100vh">
      <SingleStudySet studySetId={Number.parseInt(studySetId)} />
    </Box>
  );
};

export default SingleStudySetRoute;
