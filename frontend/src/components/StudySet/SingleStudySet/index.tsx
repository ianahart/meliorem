import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import Main from './Main';
import StillLearning from './StillLearning';
import FlashCards from './FlashCards';
import { IStudySetCardFull } from '../../../interfaces';
import { useLocation } from 'react-router-dom';
import Reviews from './Reviews';
import Notes from './Notes';

interface ISingleStudySetProps {
  studySetId: number;
}

const SingleStudySet = ({ studySetId }: ISingleStudySetProps) => {
  const shouldRun = useRef(true);
  const location = useLocation();

  const [studySetCards, setStudySetCards] = useState<IStudySetCardFull[]>([]);
  const [filteredStudySetCards, setFilteredStudySetCards] = useState<IStudySetCardFull[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Original');

  useEffect(() => {
    setFilteredStudySetCards(studySetCards);
  }, [studySetCards.length]);

  const getStudySetCards = () => {
    Client.getStudySetCards(studySetId)
      .then((res) => {
        const { data } = res.data;
        setStudySetCards(data);
        setFilteredStudySetCards(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const createStreak = () => {
    Client.createStreak(studySetId)
      .then(() => {})
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      createStreak();
      getStudySetCards();
    }
  }, [shouldRun.current]);

  const updateField = <T,>(value: T, prop: string, id: number | string) => {
    const cards = filteredStudySetCards.map((studySetCard) => {
      if (studySetCard.id === id) {
        return { ...studySetCard, [prop]: value };
      }
      return { ...studySetCard };
    });
    setFilteredStudySetCards(cards);
  };

  const handleMenuItemClick = (clickedMenuItem: string) => {
    setSelectedMenuItem(clickedMenuItem);
    let updatedStudySetCards: IStudySetCardFull[] = [];
    switch (clickedMenuItem) {
      case 'Sort':
        const sortedCards = [...studySetCards];
        updatedStudySetCards = sortedCards.sort(() => Math.random() - 0.5);
        break;
      case 'Alphabetical':
        const alphabeticalStudySetCards = [...studySetCards];
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
    <Box>
      <Box mx="auto" as="section" w="100%" maxW={['95%', '95%', '768px']}>
        <Box my="2rem">
          <Reviews studySetId={studySetId} studySetTitle={location.state.title} />
        </Box>
        <Box my="2rem">
          <FlashCards handleMenuItemClick={handleMenuItemClick} studySetCards={filteredStudySetCards} />
        </Box>
        <Box my="2rem">
          <Main studySetId={studySetId} />
        </Box>
        <Box my="2rem">
          <StillLearning
            filteredStudySetCards={filteredStudySetCards}
            updateField={updateField}
            studySetCards={studySetCards}
            studySetId={studySetId}
            handleMenuItemClick={handleMenuItemClick}
            selectedMenuItem={selectedMenuItem}
          />
        </Box>
        <Box my="2rem">
          <Notes studySetId={studySetId} />
        </Box>
      </Box>
    </Box>
  );
};

export default SingleStudySet;
