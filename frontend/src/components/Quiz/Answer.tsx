import { Flex, Text } from '@chakra-ui/react';

export interface IAnswerProps {
  letter: string;
  text: string;
  correctAnswer: string;
  handleSelectedAnswer: (answer: string) => void;
  selectedAnswer: string;
}

const Answer = ({ letter, text, correctAnswer, handleSelectedAnswer, selectedAnswer }: IAnswerProps) => {
  const onSelectedAnswer = () => {
    handleSelectedAnswer(text);
  };

  const highlight = (background: boolean) => {
    if (selectedAnswer.length && selectedAnswer === text) {
      return correctAnswer === selectedAnswer ? 'green' : 'red';
    } else {
      return background ? 'primary.dark' : '';
    }
  };

  return (
    <Flex
      pointerEvents={selectedAnswer.length ? 'none' : 'auto'}
      cursor="pointer"
      onClick={onSelectedAnswer}
      align="center"
      m="1rem"
      width="30%"
      border="1px solid transparent"
      borderRadius={4}
      p="0.25rem"
      borderColor={highlight(false)}
    >
      <Flex
        flexDir="column"
        align="center"
        justify="center"
        bg={highlight(true)}
        borderRadius={50}
        width="20px"
        height="20px"
      >
        <Text fontWeight="bold">{letter}</Text>
      </Flex>
      <Text _hover={{ opacity: 0.8 }} ml="0.5rem" fontSize="1.2rem" fontWeight="bold">
        {text}
      </Text>
    </Flex>
  );
};

export default Answer;
