import { IStudySetCardFull } from '../../../../interfaces';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { FaRegLightbulb } from 'react-icons/fa';

export interface ICardProps {
  onRotate: () => void;
  studySetCard: IStudySetCardFull;
  isFullScreen: boolean;
  isRotated: boolean;
  actionClicked: boolean;
  setActionClicked: (actionClicked: boolean) => void;
  handleSetHintShowing: () => void;
  isHintShowing: boolean;
}

const Card = ({
  onRotate,
  studySetCard,
  isFullScreen,
  isRotated,
  actionClicked,
  setActionClicked,
  handleSetHintShowing,
  isHintShowing,
}: ICardProps) => {
  const cardHint = useMemo(() => {
    if (studySetCard?.definition) {
      const list = studySetCard?.definition.split(' ');
      const randomWord = Math.floor(Math.random() * list.length);
      return list.length > 1 ? `${list[randomWord]}_____` : '_____';
    }
  }, [studySetCard]);

  return (
    <>
      <Flex
        width="80px"
        p="0.5rem"
        borderRadius={16}
        justify="flex-start"
        cursor="pointer"
        align="center"
        my="0.5rem"
        textAlign="center"
        bg="gray.200"
        color="#333"
        position="relative"
        onClick={handleSetHintShowing}
      >
        <Text fontWeight="bold">Get a hint</Text>
        <Box ml="0.5rem">
          <FaRegLightbulb />
        </Box>
        {isHintShowing && (
          <Box
            fontWeight="bold"
            color="#fff"
            p="0.5rem"
            top="-30px"
            right="-90px"
            position="absolute"
            bg="bg.primary"
            minH="35px"
            borderRadius={8}
          >
            <Text>{cardHint}</Text>
          </Box>
        )}
      </Flex>
      <Box
        onClick={onRotate}
        minH={isFullScreen ? '600px' : '300px'}
        className="flip-card"
        width="100%"
        borderRadius={8}
        boxShadow="md"
      >
        <Box
          bg={studySetCard?.bgColor || 'form.primary'}
          minH={isFullScreen ? '600px' : '300px'}
          backgroundImage={studySetCard?.image}
          backgroundSize="cover"
          borderRadius={2}
          color={studySetCard?.color || '#fff'}
          transform={isRotated ? 'rotateY(180deg)' : 'rotateY(0deg)'}
          className={`flip-card-inner ${actionClicked ? 'slide-in' : ''}`}
          onAnimationEnd={() => setActionClicked(false)}
        >
          {/*Front Of Card*/}
          <Flex align="center" justify="center" borderRadius={8} className="flip-card-front">
            <Text fontSize="1.5rem" fontWeight="bold">
              {studySetCard?.term}
            </Text>
          </Flex>
          {/*Back of Card*/}
          <Flex align="center" justify="center" borderRadius={8} className="flip-card-back">
            <Text fontSize="1.5rem" fontWeight="bold">
              {studySetCard?.definition}
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Card;
