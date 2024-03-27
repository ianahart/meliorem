import { Flex, Heading, Image, Text } from '@chakra-ui/react';

export interface IToolProps {
  heading: string;
  text: string;
  image: string;
  alt: string;
}

const Tool = ({ heading, text, image, alt }: IToolProps) => {
  return (
    <Flex my={['1rem', '1rem', '0']} color="text.secondary" flexDir="column" align="center">
      <Image width="80px" height="80px" src={image} alt={alt} />
      <Heading mb="0.5rem" fontSize="1.4rem" as="h4">
        {heading}
      </Heading>
      <Text>{text}</Text>
    </Flex>
  );
};

export default Tool;
