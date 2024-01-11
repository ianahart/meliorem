import { Box, Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import HamburgerMenu from './HamburgerMenu';

import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';

const Navigation = () => {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const { user } = useContext(UserContext) as IUserContext;

  const closeHamburgerMenu = () => setHamburgerMenuOpen(false);

  return (
    <Box
      as="nav"
      p="1.2rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {hamburgerMenuOpen && <HamburgerMenu closeHamburgerMenu={closeHamburgerMenu} />}
      <Flex align="center">
        <Heading display={['none', 'none', 'block']} color="primary.dark" as="h2">
          Meliorem
        </Heading>
        <Flex display={['flex', 'flex', 'none']} align="center">
          <Box
            onClick={() => setHamburgerMenuOpen(true)}
            fontSize="2.5rem"
            color="primary.dark"
            cursor="pointer"
          >
            <RxHamburgerMenu />
          </Box>
          <Box color="primary.dark">
            <NavLink to="/">
              <Text fontWeight="bold" fontSize="2.2rem" mx="1rem">
                M
              </Text>
            </NavLink>
          </Box>
        </Flex>
      </Flex>
      <UnorderedList
        display="flex"
        fontSize="1.4rem"
        color="text.secondary"
        listStyleType="none"
      >
        {!user.loggedIn && (
          <>
            <ListItem fontWeight="bold" mx="1.5rem" p="1rem">
              <NavLink to="/login">Log in</NavLink>
            </ListItem>
            <ListItem
              bg="primary.light"
              color="#fff"
              p="1rem"
              fontWeight="bold"
              mx="1.5rem"
              borderRadius={8}
            >
              <NavLink to="/register">Sign up</NavLink>
            </ListItem>
          </>
        )}
      </UnorderedList>
    </Box>
  );
};

export default Navigation;
