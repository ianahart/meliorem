import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import StudySetCard from './StudySetCard';
import { useContext } from 'react';
import { StudySetContext } from '../../context/studyset';
import { IStudySetContext } from '../../interfaces';
import { nanoid } from 'nanoid';

const StudySetCards = () => {
  const { studySetForm, handleSetStudySetForm } = useContext(
    StudySetContext
  ) as IStudySetContext;

  const handleDragAndDrop = (result: any) => {
    const { source, destination, type, draggableId } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'group') {
      let reorderedCards = [...studySetForm.cards];
      const [deleted] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, deleted);

      reorderedCards.map((card, index) => {
        if (card.id === draggableId) {
          card['order'] = destination.index;
        } else {
          card['order'] = index;
        }
        return card;
      });

      handleSetStudySetForm({ ...studySetForm, cards: reorderedCards });
    }
  };

  const addNewCard = () => {
    const cards = [...studySetForm.cards];

    cards.push({
      number: cards.length + 1,
      id: nanoid(),
      order: cards.length,
      color: '',
      bgColor: '',
      term: '',
      definition: '',
      image: '',
    });
    handleSetStudySetForm({ ...studySetForm, cards });
  };

  return (
    <Box>
      <Heading fontSize="3rem" as="h2">
        Add study cards
      </Heading>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="ROOT" type="group" direction="vertical">
          {(provided) => (
            <Flex flexDir="column" {...provided.droppableProps} ref={provided.innerRef}>
              {studySetForm.cards.map((card, index) => (
                <Draggable draggableId={card.id} key={card.id} index={index}>
                  {(provided) => (
                    <Box {...provided.draggableProps} ref={provided.innerRef}>
                      <StudySetCard
                        number={index}
                        provided={provided}
                        studySetCard={card}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
      <Flex
        onClick={addNewCard}
        flexDir="column"
        align="center"
        my="3rem"
        bg="form.primary"
        borderRadius={8}
        p="1rem"
        justify="center"
        minH="120px"
      >
        <Box cursor="pointer">
          <Text fontWeight="bold" fontSize="1.4rem" textTransform="uppercase">
            + add card
          </Text>
          <Box my="0.5rem" height="3px" backgroundColor="teal"></Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudySetCards;
