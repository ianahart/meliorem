import { Box } from '@chakra-ui/react';
import HamburgerMenuLink from './HamburgerMenuLink';
import HamburgerMenuLinkMin from './HamburgerMenuLinkMin';
import { AiFillEdit } from 'react-icons/ai';
import { PiCards } from 'react-icons/pi';

export interface IHamburgerMenuLinksProps {
  closeHamburgerMenu: () => void;
}

const HamburgerMenuLinks = ({ closeHamburgerMenu }: IHamburgerMenuLinksProps) => {
  const createSubLinks = [{ linkName: '/study-set', linkText: 'Study set', icon: <PiCards /> }];

  return (
    <Box color="primary.light">
      <HamburgerMenuLinkMin closeHamburgerMenu={closeHamburgerMenu} linkPath="/" linkName="Home" icon="M" />
      <HamburgerMenuLink
        closeHamburgerMenu={closeHamburgerMenu}
        linkName="Create"
        icon={<AiFillEdit />}
        subLinks={createSubLinks}
      />
    </Box>
  );
};

export default HamburgerMenuLinks;
