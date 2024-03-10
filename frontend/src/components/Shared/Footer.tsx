import { Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Flex justify="space-around" className="footer" as="footer">
      <Text color="primary.light">
        <RouterLink to="/privacy-policy">Privacy policy</RouterLink>
      </Text>
      <Text color="primary.light" fontSize="1.2rem">
        Created by Ian Hart 2024
      </Text>
      <Text color="primary.light">
        <RouterLink to="/terms-of-service">Terms of service</RouterLink>
      </Text>
    </Flex>
  );
};

export default Footer;
