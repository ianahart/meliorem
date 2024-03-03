import { Box, Button, Flex, FormControl, FormLabel, Heading, Select, Stack, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ITopics {
  [key: number]: string;
}

const Form = () => {
  const navigate = useNavigate();
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState(9);

  const topics: ITopics = {
    9: 'General knowledge',
    17: 'Science and nature',
    18: 'Science and computers',
    19: 'Science and mathematics',
    22: 'Geography',
    23: 'History',
    24: 'Politics',
    25: 'Art',
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'numOfQuestions':
        setNumOfQuestions(Number.parseInt(value));
        break;
      case 'topic':
        setTopic(Number.parseInt(value));
        break;
      case 'difficulty':
        setDifficulty(value);
        break;
    }
  };

  const onGenerateQuiz = () => {
    const topicName = topics[topic as keyof ITopics];
    const quizAPIUrl = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${topic}&difficulty=${difficulty}&type=multiple`;
    navigate(`/quiz/${nanoid()}`, { state: { quizAPIUrl, topicName } });
  };

  return (
    <Box p="1rem" borderRadius={8} bg="bg.primary">
      <Box color="primary.light">
        <Heading mb="0.5rem">Create a quiz</Heading>
        <Text fontSize="1.2rem">Choose what to include in the quiz</Text>
      </Box>
      <form style={{ color: '#Fff' }}>
        <Stack spacing={3}>
          <FormControl my="2rem">
            <FormLabel htmlFor="numOfQuestions">Number of questions</FormLabel>
            <Select
              value={numOfQuestions}
              onChange={handleOnChange}
              borderColor="border.primary"
              height="35px"
              id="numOfQuestions"
              name="numOfQuestions"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </Select>
          </FormControl>
          <FormControl my="2rem">
            <FormLabel htmlFor="topic">Select topic</FormLabel>
            <Select
              value={topic}
              onChange={handleOnChange}
              borderColor="border.primary"
              height="35px"
              id="topic"
              name="topic"
            >
              {Object.entries(topics).map(([key, val]) => {
                return (
                  <option key={key} value={key}>
                    {val}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl my="2rem">
            <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
            <Select
              value={difficulty}
              onChange={handleOnChange}
              borderColor="border.primary"
              height="35px"
              id="difficulty"
              name="difficulty"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </FormControl>
        </Stack>
        <Flex justify="flex-end" my="3rem">
          <Button onClick={onGenerateQuiz} colorScheme="purple" size="lg">
            Generate quiz
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Form;
