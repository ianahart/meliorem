import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Client } from '../util/client';

const HomeRoute = () => {
  const shouldRun = useRef(true);

  const getHeartbeat = () => {
    Client.heartbeat()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getHeartbeat();
    }
  }, []);

  return <Box>Home Route</Box>;
};

export default HomeRoute;
