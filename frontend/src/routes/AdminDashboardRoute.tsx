import { Box, Grid, GridItem, Image } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/AdminDashboard/Sidebar';
import adminImg from '../assets/admin.svg';

const AdminDashboardRoute = () => {
  const location = useLocation();
  const outletShowing = location.pathname !== '/admin/dashboard';

  return (
    <Box pb="2rem">
      <Box boxShadow="md" maxW="1280px" mt="5rem" mx="auto" w={['95%', '95%', '100%']} minH="800px">
        <Grid minH="800px">
          <GridItem
            borderLeftRadius={4}
            my={[2, 2, 0]}
            minW={['100%', '100%', '250px']}
            colStart={1}
            colEnd={[12, 12, 2]}
            bg="bg.primary"
          >
            <Sidebar />
          </GridItem>
          <GridItem
            borderRightRadius={4}
            display={['block', 'block', 'flex']}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            my={[2, 2, 0]}
            colStart={[1, 1, 2]}
            colEnd={12}
            bg="bg.dark"
          >
            {!outletShowing && (
              <Box maxW="100%" w={['100%', '100%', '80%']}>
                <Image src={adminImg} alt="admin dashboard data trends" />
              </Box>
            )}

            <Box bg="bg.primary" borderRadius={4}>
              <Outlet />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboardRoute;
