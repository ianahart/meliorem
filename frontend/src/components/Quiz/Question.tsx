import { Button, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import Answer from './Answer';

interface IQuestionProps {
  question: string;
  questionIndex: number;
  correctAnswer: string;
  incorrectAnswers: string[];
  moveToNextQuestion: () => void;
  handleAnswer: (isCorrect: boolean) => void;
}

const Question = ({
  question,
  questionIndex,
  correctAnswer,
  incorrectAnswers,
  moveToNextQuestion,
  handleAnswer,
}: IQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSelectedAnswer = (answer: string) => {
    setSelectedAnswer(answer);

    answer === correctAnswer ? handleAnswer(true) : handleAnswer(false);
  };

  const onNextQuestion = () => {
    setSelectedAnswer('');
    moveToNextQuestion();
  };

  const answers = useMemo(() => {
    const arr = [correctAnswer, ...incorrectAnswers];
    arr.sort(() => Math.random() - 0.5);

    return arr;
  }, [correctAnswer, incorrectAnswers]);

  return (
    <Flex
      flexDir="column"
      bg="rgba(0, 0, 0, 0.9)"
      mx="auto"
      maxW="100%"
      width={['95%', '95%', '600px']}
      p="1rem"
      mt="15rem"
      borderRadius={8}
    >
      <Flex fontSize="1.2rem">
        <Flex mb="0.5rem">
          <Text fontWeight="bold">{questionIndex + 1}).</Text>
        </Flex>
        <Text ml="0.5rem" fontWeight="bold">
          {question}
        </Text>
      </Flex>
      <Flex justify="center" flexWrap="wrap">
        <Answer
          handleSelectedAnswer={handleSelectedAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          letter="A"
          text={answers[0]}
        />
        <Answer
          handleSelectedAnswer={handleSelectedAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          letter="B"
          text={answers[1]}
        />
        <Answer
          handleSelectedAnswer={handleSelectedAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          letter="C"
          text={answers[2]}
        />
        <Answer
          handleSelectedAnswer={handleSelectedAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          letter="D"
          text={answers[3]}
        />
      </Flex>
      {selectedAnswer.length > 0 && (
        <Flex justify="flex-end">
          <Button colorScheme="blue" onClick={onNextQuestion}>
            Next
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
export default Question;
