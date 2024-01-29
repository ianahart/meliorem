import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';

const StreakCounter = () => {
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;

  const getStreakCounter = () => {
    Client.getStreak(user.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getStreakCounter();
    }
  }, [shouldRun.current, user.id]);

  return <Box>streak counter</Box>;
};

export default StreakCounter;
