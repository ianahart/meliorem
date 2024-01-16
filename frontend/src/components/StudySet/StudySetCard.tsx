import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { RiDraggable } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import { IStudySetCard, IStudySetContext } from '../../interfaces';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useContext } from 'react';
import { StudySetContext } from '../../context/studyset';

import StudySetCardInput from './StudySetCardInput';
import StudySetCardOptions from './StudySetCardOptions';
export interface IStudySetCardProps {
  studySetCard: IStudySetCard;
  provided: DraggableProvided;
  number: number;
}

const StudySetCard = ({ studySetCard, provided, number }: IStudySetCardProps) => {
  const { studySetForm, handleSetStudySetForm } = useContext(
    StudySetContext
  ) as IStudySetContext;

  const deleteStudySetCard = () => {
    const cards = [...studySetForm.cards]
      .filter((card) => card.id !== studySetCard.id)
      .map((card, index) => {
        card['order'] = index;
        return card;
      });

    handleSetStudySetForm({ ...studySetForm, cards });
  };

  const updateField = (name: string, value: string) => {
    const cards = [...studySetForm.cards].map((card) => {
      if (card.id === studySetCard.id) {
        card[name] = value;
      }
      return card;
    });

    handleSetStudySetForm({ ...studySetForm, cards });
  };

  return (
    <Box
      minH="140px"
      borderRadius={8}
      my="1.5rem"
      bg={studySetCard.bgColor.length > 0 ? studySetCard.bgColor : 'form.primary'}
    >
      <StudySetCardOptions studySetCardId={studySetCard.id} />
      <Flex
        p="1rem"
        pt="0"
        color="primarylight"
        justify="space-between"
        align="center"
        cursor="pointer"
      >
        <Box>
          <Text fontSize="1.4rem" fontWeight="bold">
            {number + 1}
          </Text>
        </Box>
        <Flex align="center">
          <Tooltip label="Drag">
            <Box fontSize="3rem" mx="0.5rem" {...provided.dragHandleProps}>
              <RiDraggable />
            </Box>
          </Tooltip>
          <Tooltip label="Delete">
            <Box onClick={deleteStudySetCard} fontSize="2rem" mx="0.5rem">
              <FaTrash />
            </Box>
          </Tooltip>
        </Flex>
      </Flex>
      <Box height="2px" backgroundColor="#2e2e2f"></Box>
      <Flex py="1rem" my="2rem" justify="center" align="center" width="100%" mx="auto">
        <Box width="45%" mx="1.5rem">
          <StudySetCardInput
            updateField={updateField}
            label="TERM"
            placeHolder="Enter a term"
            color={studySetCard.color ?? '#fff'}
            value={studySetCard.term}
            name="term"
          />
        </Box>
        <Box width="45%" mx="1.5rem">
          <StudySetCardInput
            updateField={updateField}
            label="DEFINITION"
            placeHolder="Enter a definition"
            color={studySetCard.color ?? '#fff'}
            value={studySetCard.definition}
            name="definition"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default StudySetCard;
