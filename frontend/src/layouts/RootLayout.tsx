import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer';
import Navigation from '../components/Shared/Navigation';

const RootLayout = () => {
  return (
    <>
      <Box as="header">
        <Navigation />
      </Box>
      <Box className="content" as="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default RootLayout;
