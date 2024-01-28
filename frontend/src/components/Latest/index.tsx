import { Box } from '@chakra-ui/react';
import LatestContainer from './LatestContainer';
import YourStudySets from './YourStudySets';

const Latest = () => {
  return (
    <LatestContainer>
      <Box my="2rem" as="section">
        <YourStudySets />
      </Box>
    </LatestContainer>
  );
};

export default Latest;
