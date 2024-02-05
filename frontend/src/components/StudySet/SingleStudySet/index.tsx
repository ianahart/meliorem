import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Client } from '../../../util/client';
import Main from './Main';
import StillLearning from './StillLearning';
import FlashCards from './FlashCards';

interface ISingleStudySetProps {
  studySetId: number;
}

const SingleStudySet = ({ studySetId }: ISingleStudySetProps) => {
  const shouldRun = useRef(true);

  const createStreak = () => {
    Client.createStreak(studySetId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      createStreak();
    }
  }, [shouldRun.current]);

  return (
    <Box mx="auto" as="section" w="100%" maxW={['95%', '95%', '768px']}>
      <Box my="2rem">
        <FlashCards studySetId={studySetId} />
      </Box>
      <Box my="2rem">
        <Main studySetId={studySetId} />
      </Box>
      <Box my="2rem">
        <StillLearning studySetId={studySetId} />
      </Box>
    </Box>
  );
};

export default SingleStudySet;
