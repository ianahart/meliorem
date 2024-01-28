import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Client } from '../../../util/client';

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

  return <Box as="section">{studySetId}</Box>;
};

export default SingleStudySet;
