import { Spinner, Flex, Text } from '@chakra-ui/react';

interface IBasicSpinnerProps {
  message: string;
  color: string;
}

const BasicSpinner = ({ message, color }: IBasicSpinnerProps) => {
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
      <Text color={color} fontSize="0.9rem">
        {message}
      </Text>
    </Flex>
  );
};

export default BasicSpinner;
