import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import landingFlashCardImg from '../../assets/landing-flashcard.svg';
import landingNotesImg from '../../assets/landing-notes.svg';
import landingMessagesImg from '../../assets/landing-messages.svg';
import Tool from './Tool';

const Tools = () => {
  return (
    <Flex pt="10rem" justify="center" bg="primary.light" minH="600px">
      <Box maxW="800px" w={['100%', '100%', '800px']} mx="auto">
        <Heading textAlign="center" fontSize="3rem" fontWeight="600" color="text.secondary">
          Get the most out of Meliorem with these tools
        </Heading>
        <Box borderRadius={6} mt="6rem" mb="3rem" boxShadow="lg" bg="#fff" minH="300px">
          <Flex flexDir={['column', 'column', 'row']} p="1rem" justify="space-around" align="center" pt="3rem">
            <Tool
              heading="Create Notes"
              text="Upload your notes to have them readily available"
              image={landingNotesImg}
              alt="a person standing next to a gaint notebook"
            />
            <Tool
              heading="Flash cards"
              text="Study with flash cards that play automatically"
              image={landingFlashCardImg}
              alt="a person standing next to multiple giant flash cards"
            />
            <Tool
              heading="Messaging"
              text="Message other students to further study"
              image={landingMessagesImg}
              alt="a person standing nex to a screen with a message on it"
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Tools;
