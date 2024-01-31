import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Client } from '../../../util/client';
import { useNavigate } from 'react-router-dom';

interface IMainProps {
  studySetId: number;
}

const Main = ({ studySetId }: IMainProps) => {
  const shouldRun = useRef(true);
  const navigate = useNavigate();

  const getStudySet = () => {
    Client.getStudySet(studySetId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.status === 404);
        if (err.response.status === 404) {
          navigate('*');
        }
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getStudySet();
    }
  }, [shouldRun.current]);

  return (
    <Box fontSize="1.2rem" p="1rem" color="#fff" border="1px solid yellow">
      Main
    </Box>
  );
};

export default Main;
