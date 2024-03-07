import { Box, Heading, Flex, Text, UnorderedList, ListItem, Tooltip } from '@chakra-ui/react';
import { AiOutlineMinusCircle } from 'react-icons/ai';

export interface IDaysProps {
  studyDays: { day: number; name: string }[];
  selectedStudyDays: { day: number; name: string }[];
  onSelectStudyDay: (selectedStudyday: { day: number; name: string }) => void;
  onDeSelectStudyDay: (deSelectedStudyDay: { day: number; name: string }) => void;
}

const Days = ({ studyDays, selectedStudyDays, onSelectStudyDay, onDeSelectStudyDay }: IDaysProps) => {
  return (
    <Box bg="form.primary" minH="300px" borderRadius={8} p="1rem">
      <Box my="1rem">
        <Heading as="h3" color="primary.light" fontSize="1.8rem">
          Which days would you like to study on?
        </Heading>
      </Box>
      <Flex flexWrap="wrap" justify="space-around" width={['100%', '100%', '50%']}>
        {studyDays.map((studyDay) => {
          return (
            <Box
              onClick={() => onSelectStudyDay(studyDay)}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              m="1rem"
              color="#fff"
              bg="bg.primary"
              p="1rem"
              borderRadius={20}
              key={studyDay.day}
            >
              <Text fontSize="1.2rem">{studyDay.name}</Text>
            </Box>
          );
        })}
      </Flex>
      {selectedStudyDays.length > 0 && (
        <Box mt="3rem">
          <Heading color="#fff" fontSize="1.8rem">
            Selected study days
          </Heading>
        </Box>
      )}
      <UnorderedList
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        width={['100%', '100%', '50%']}
        listStyleType="none"
        mt="1rem"
      >
        {selectedStudyDays.map((selectedStudyDay) => {
          return (
            <ListItem
              borderRadius={20}
              p="0.5rem"
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              my="0.5rem"
              display="flex"
              alignItems="flex-start"
              bg="bg.primary"
              color="light.primary"
              key={selectedStudyDay.day}
            >
              <Box fontSize="1.2rem">
                <Text>{selectedStudyDay.name}</Text>
              </Box>
              <Tooltip label="remove">
                <Box onClick={() => onDeSelectStudyDay(selectedStudyDay)} ml="1rem" fontSize="1.6rem">
                  <AiOutlineMinusCircle />
                </Box>
              </Tooltip>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default Days;
