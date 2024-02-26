import { Box, Image, Flex, Text, Heading } from '@chakra-ui/react';

export interface IStepSectionProps {
  heading: string;
  text: string;
  image: string;
  rowReverse: boolean;
  alt: string;
}

const StepSection = ({ heading, text, image, rowReverse, alt }: IStepSectionProps) => {
  return (
    <Box color="#fff" my="2rem">
      <Flex flexDir={rowReverse ? 'row-reverse' : 'row'} justify="space-between">
        <Box>
          <Heading mb="1rem">{heading}</Heading>
          <Text fontSize="1.2rem" lineHeight="1.6" width="80%">
            {text}
          </Text>
        </Box>
        <Box>
          <Image src={image} alt={alt} />
        </Box>
      </Flex>
    </Box>
  );
};

export default StepSection;
