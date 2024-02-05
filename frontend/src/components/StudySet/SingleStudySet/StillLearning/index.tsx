import { Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { IStudySetCardFull } from '../../../../interfaces';
import StillLearningCard from './StillLearningCard';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

export interface IStillLearningProps {
  studySetId: number;
  updateField: <T>(value: T, prop: string, id: number | string) => void;
  studySetCards: IStudySetCardFull[];
  filteredStudySetCards: IStudySetCardFull[];
  selectedMenuItem: string;
  handleMenuItemClick: (selectedMenuItem: string) => void;
}

const StillLearning = ({
  updateField,
  studySetCards,
  handleMenuItemClick,
  selectedMenuItem,
  filteredStudySetCards,
}: IStillLearningProps) => {
  return (
    <Box color="#fff" p="1rem">
      <Flex justify="space-between">
        <Box>
          <Heading mb="1.5rem" fontSize="1.7rem">
            Terms in the set ({studySetCards.length})
          </Heading>
          <Text fontWeight="bold">You've started learning these terms, keep it up!</Text>
        </Box>

        <Box>
          <Menu>
            <MenuButton
              _hover={{ bg: 'form.primary' }}
              bg="form.primary"
              color="#fff"
              as={Button}
              rightIcon={<IoChevronDownCircleOutline />}
            >
              {selectedMenuItem}
            </MenuButton>
            <MenuList bg="form.primary" color="#fff">
              <MenuItem onClick={() => handleMenuItemClick('Original')} bg="form.primary">
                Original
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Alphabetical')} bg="form.primary">
                Alphabetical
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Starred')} bg="form.primary">
                Starred
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Box>
        {filteredStudySetCards.map((studySetCard) => {
          return <StillLearningCard updateField={updateField} key={studySetCard.id} studySetCard={studySetCard} />;
        })}
      </Box>
    </Box>
  );
};

export default StillLearning;
