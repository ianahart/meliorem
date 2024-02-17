import { Box, Grid, GridItem } from '@chakra-ui/react';
import Chat from './Chat';
import Sidebar from './Sidebar';

const Group = () => {
  return (
    <Box maxW="1280px" mt="5rem" mx="auto" w={['95%', '95%', '100%']} minH="800px">
      <Grid minH="800px">
        <GridItem my={[2, 2, 0]} minW={['100%', '100%', '250px']} colStart={1} colEnd={[12, 12, 2]} bg="bg.primary">
          <Sidebar />
        </GridItem>
        <GridItem my={[2, 2, 0]} colStart={[1, 1, 2]} colEnd={12} bg="bg.primary">
          <Chat />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default Group;
