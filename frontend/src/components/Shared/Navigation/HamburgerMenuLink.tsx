import { Box, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { ISubLink } from '../../../interfaces';
import { useState } from 'react';

export interface IHamburgerMenuLinkProps {
  linkName: string;
  icon: string | React.ReactNode;
  subLinks: ISubLink[];
}

const HamburgerMenuLink = ({ linkName, icon, subLinks }: IHamburgerMenuLinkProps) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <Box
      _hover={{ borderColor: 'rgba(134,74,249, 0.5)' }}
      borderLeft="5px solid"
      borderRadius={4}
      borderColor="transparent"
      p="1rem"
      my="1rem"
    >
      <Flex
        cursor="pointer"
        onClick={() => setSubMenuOpen((prevState) => !prevState)}
        align="center"
        fontSize="1.75rem"
      >
        <Box mr="0.5rem" fontSize="2.5rem" fontWeight="bold" color="primary.dark">
          {icon}
        </Box>
        <Box>
          <Text fontWeight="bold" color="text.secondary">
            {linkName}
          </Text>
        </Box>
        <Box ml="0.5rem">{subMenuOpen ? <IoChevronUp /> : <IoChevronDown />}</Box>
      </Flex>

      {subMenuOpen && (
        <Box>
          {subLinks.map((subLink, index) => {
            return (
              <Flex
                _hover={{ backgroundColor: 'rgba(134,74,249, 0.2)' }}
                ml="3rem"
                p="0.5rem"
                borderRadius={4}
                key={index}
                color="text.secondary"
                my="2rem"
                fontSize="1.4rem"
                align="center"
              >
                <Box mr="0.5rem">{subLink.icon}</Box>
                <RouterLink to={subLink.linkName}>{subLink.linkText}</RouterLink>
              </Flex>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default HamburgerMenuLink;
