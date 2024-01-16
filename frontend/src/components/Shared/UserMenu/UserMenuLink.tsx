import { Box, ListItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface IUserMenuLinkProps {
  icon: React.ReactNode;
  text: string;
  path: string;
  handleMenuOpen: (open: boolean) => void;
}

const UserMenuLink = ({ icon, text, path, handleMenuOpen }: IUserMenuLinkProps) => {
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate(path);
    handleMenuOpen(false);
  };

  return (
    <ListItem
      cursor="pointer"
      _hover={{ backgroundColor: '#3f3f3f' }}
      my="1rem"
      p="1rem"
      fontSize="1.4rem"
      display="flex"
      alignItems="center"
      color="primary.light"
      onClick={navigateToPage}
    >
      <Box mr="0.5rem">{icon}</Box>
      <Text>{text}</Text>
    </ListItem>
  );
};

export default UserMenuLink;
