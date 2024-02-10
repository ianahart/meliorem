import { Box } from '@chakra-ui/react';
import LatestContainer from './LatestContainer';
import YourStudySets from './YourStudySets';
import AllStudySets from './AllStudySets';
import StreakCounter from './StreakCounter';
import Folders from './Folders';
import BookMarks from './BookMarks';

const Latest = () => {
  return (
    <LatestContainer>
      <Box my="2rem" as="section">
        <YourStudySets />
      </Box>
      <Box my="2rem" as="section">
        <AllStudySets />
      </Box>
      <Box my="2rem" as="section">
        <BookMarks />
      </Box>
      <Box ml="1rem" my="2rem" as="section">
        <StreakCounter />
      </Box>
      <Box my="2rem" as="section">
        <Folders />
      </Box>
    </LatestContainer>
  );
};

export default Latest;
