import { Box } from '@chakra-ui/react';
import HamburgerMenuLink from './HamburgerMenuLink';
import HamburgerMenuLinkMin from './HamburgerMenuLinkMin';
import { AiFillEdit } from 'react-icons/ai';
import { CgNotes } from 'react-icons/cg';
import { PiCards } from 'react-icons/pi';
import { FaRegFolder } from 'react-icons/fa';

const HamburgerMenuLinks = () => {
  const createSubLinks = [
    { linkName: '/notes', linkText: 'Notes', icon: <CgNotes /> },
    { linkName: '/study-set', linkText: 'Study set', icon: <PiCards /> },
    { linkName: '/folder', linkText: 'Folder', icon: <FaRegFolder /> },
  ];

  return (
    <Box>
      <HamburgerMenuLinkMin linkPath="/" linkName="Home" icon="M" />
      <HamburgerMenuLink
        linkName="Create"
        icon={<AiFillEdit />}
        subLinks={createSubLinks}
      />
    </Box>
  );
};

export default HamburgerMenuLinks;
