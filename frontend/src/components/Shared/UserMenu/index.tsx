import { Box, Flex, Text, UnorderedList } from '@chakra-ui/react';
import UserAvatar from '../UserAvatar';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext } from '../../../interfaces';
import ClickAwayMenu from '../ClickAwayMenu';
import { elipsisize } from '../../../util';
import UserMenuLink from './UserMenuLink';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import Logout from '../Logout';

const UserMenu = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = (open: boolean) => setMenuOpen(open);

  return (
    <Box pos="relative">
      <Box onClick={() => handleMenuOpen(!menuOpen)} cursor="pointer" ref={triggerRef}>
        <UserAvatar
          avatarUrl={user.avatarUrl}
          fullName={user.fullName}
          width="45px"
          height="45px"
          fontSize="1.4rem"
        />
      </Box>
      {menuOpen && (
        <ClickAwayMenu
          handleMenuOpen={handleMenuOpen}
          triggerRef={triggerRef}
          menuRef={menuRef}
          top="65px"
          left="unset"
          right="10px"
          bottom="unset"
          backgroundColor="bg.primary"
          width="220px"
          height="350px"
        >
          <Box>
            <Flex align="center">
              <Box p="1rem">
                <UserAvatar
                  avatarUrl={user.avatarUrl}
                  fullName={user.fullName}
                  width="40px"
                  height="40px"
                  fontSize="1.4rem"
                />
              </Box>
              <Box color="primary.dark">
                <Text fontWeight="bold">{elipsisize(user.fullName, 20)}</Text>
                <Text>{elipsisize(user.email, 20)}</Text>
              </Box>
            </Flex>
            <Box height="1px" width="100%" backgroundColor="border.primary"></Box>
            <Box>
              <UnorderedList p="0" m="0">
                <UserMenuLink
                  text="Profile"
                  path={`${user.slug}/profile`}
                  icon={<CgProfile />}
                  handleMenuOpen={handleMenuOpen}
                />
                <UserMenuLink
                  text="Settings"
                  path={`${user.slug}/settings`}
                  icon={<IoSettingsOutline />}
                  handleMenuOpen={handleMenuOpen}
                />
              </UnorderedList>
            </Box>
            <Box height="1px" width="100%" backgroundColor="border.primary"></Box>
            <UnorderedList p="0" m="0">
              <Logout />
            </UnorderedList>
            <Box height="1px" width="100%" backgroundColor="border.primary"></Box>
          </Box>
        </ClickAwayMenu>
      )}
    </Box>
  );
};

export default UserMenu;
