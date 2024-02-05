import { IStudySetCardFull } from '../../../../interfaces';
import { Box, Flex, Text } from '@chakra-ui/react';

export interface ICardProps {
  onRotate: () => void;
  studySetCard: IStudySetCardFull;
  isFullScreen: boolean;
  isRotated: boolean;
  actionClicked: boolean;
  setActionClicked: (actionClicked: boolean) => void;
}

const Card = ({ onRotate, studySetCard, isFullScreen, isRotated, actionClicked, setActionClicked }: ICardProps) => {
  return (
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
  );
};

export default Card;
