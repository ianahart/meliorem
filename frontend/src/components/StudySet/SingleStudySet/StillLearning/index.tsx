import { Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../../util/client';
import { IStudySetCardFull } from '../../../../interfaces';
import StillLearningCard from './StillLearningCard';
import BasicSpinner from '../../../Shared/BasicSpinner';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { IsEqualCustomizer } from 'lodash';

export interface IStillLearningProps {
  studySetId: number;
}

const StillLearning = ({ studySetId }: IStillLearningProps) => {
  const shouldRun = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Original');
  const [studySetCards, setStudySetCards] = useState<IStudySetCardFull[]>([]);
  const [filteredStudySetCards, setFilteredStudySetCards] = useState<IStudySetCardFull[]>([]);

  const updateField = <T,>(value: T, prop: string, id: number | string) => {
    const cards = studySetCards.map((studySetCard) => {
      if (studySetCard.id === id) {
        return { ...studySetCard, [prop]: value };
      }
      return { ...studySetCard };
    });
    setStudySetCards(cards);
  };

  const getStudySetCards = () => {
    setIsLoading(true);
    Client.getStudySetCards(studySetId)
      .then((res) => {
        const { data } = res.data;
        setStudySetCards(data);
        setFilteredStudySetCards(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getStudySetCards();
    }
  }, [shouldRun.current]);

  const handleMenuItemClick = (clickedMenuItem: string) => {
    setSelectedMenuItem(clickedMenuItem);
    let updatedStudySetCards: IStudySetCardFull[] = [];
    switch (clickedMenuItem) {
      case 'Alphabetical':
        const alphabeticalStudySetCards = [...studySetCards];
                console.log(alphabeticalStudySetCards)
        updatedStudySetCards = alphabeticalStudySetCards.sort((a, b) => a.term.localeCompare(b.term));
        break;
      case 'Original':
        const originalStudySetCards = [...studySetCards];
        updatedStudySetCards = originalStudySetCards.sort((a, b) => (a.id as number) - (b.id as number));
        break;
      case 'Starred':
        updatedStudySetCards = [...filteredStudySetCards].filter((studySetCard) => studySetCard.starred);
        break;
    }
    setFilteredStudySetCards(updatedStudySetCards);
  };

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
      {isLoading ? (
        <BasicSpinner message="Loading cards..." color="#fff" />
      ) : (
        <Box>
          {filteredStudySetCards.map((studySetCard) => {
            return <StillLearningCard updateField={updateField} key={studySetCard.id} studySetCard={studySetCard} />;
          })}
        </Box>
      )}
    </Box>
  );
};

export default StillLearning;
