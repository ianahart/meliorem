import { Box } from '@chakra-ui/react';
import Hero from '../components/Home/Hero';
import Tools from '../components/Home/Tools';
import Steps from '../components/Home/Steps';

const HomeRoute = () => {
  return (
    <Box>
      <Hero />
      <Tools />
        <Steps />
    </Box>
  );
};

export default HomeRoute;
