import { Box } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer';

const RootLayout = () => {
  return (
    <>
      <Box as="header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Create Account</NavLink>
      </Box>
      <Box className="content" as="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default RootLayout;
