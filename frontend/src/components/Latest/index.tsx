import { Box } from '@chakra-ui/react';
import LatestContainer from './LatestContainer';
import YourStudySets from './YourStudySets';
import AllStudySets from './AllStudySets';

const Latest = () => {
  return (
    <LatestContainer>
      <Box my="2rem" as="section">
        <YourStudySets />
      </Box>
      <Box my="2rem" as="section">
        <AllStudySets />
      </Box>
    </LatestContainer>
  );
};

export default Latest;
