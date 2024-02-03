import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../../util/client';
import { IStudySetCardFull } from '../../../../interfaces';
import StillLearningCard from './StillLearningCard';

export interface IStillLearningProps {
  studySetId: number;
}

const StillLearning = ({ studySetId }: IStillLearningProps) => {
  const shouldRun = useRef(true);
  const [studySetCards, setStudySetCards] = useState<IStudySetCardFull[]>([]);

  const updateField = (value: string, prop: string, id: number | string) => {
    const cards = studySetCards.map((studySetCard) => {
      if (studySetCard.id === id) {
        return { ...studySetCard, [prop]: value };
      }
      return { ...studySetCard };
    });
    setStudySetCards(cards);
  };

  const getStudySetCards = () => {
    Client.getStudySetCards(studySetId)
      .then((res) => {
        const { data } = res.data;
        setStudySetCards(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getStudySetCards();
    }
  }, [shouldRun.current]);

  return (
    <Box color="#fff" border="1px solid pink" p="1rem">
      <Box>
        <Heading mb="1.5rem" fontSize="1.7rem">
          Terms in the set ({studySetCards.length})
        </Heading>
        <Text fontWeight="bold">You've started learning these terms, keep it up!</Text>
      </Box>
      <Box>
        {studySetCards.map((studySetCard) => {
          return <StillLearningCard updateField={updateField} key={studySetCard.id} studySetCard={studySetCard} />;
        })}
      </Box>
    </Box>
  );
};

export default StillLearning;
