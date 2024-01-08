import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex justify="center" className="footer" as="footer">
      <Text color="text.secondary" fontSize="1.2rem">
        Created by Ian Hart 2024
      </Text>
    </Flex>
  );
};

export default Footer;
