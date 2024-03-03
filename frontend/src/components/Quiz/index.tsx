import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Client } from '../../util/client';
import { IQuizQuestion, IUserContext } from '../../interfaces';
import quizImg from '../../assets/quiz.svg';
import celebratioImg from '../../assets/celebration.png';
import ConfettiExplosion from 'react-confetti-explosion';
import Question from './Question';
import { UserContext } from '../../context/user';

const Quiz = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<IQuizQuestion[]>([]);
  const [title, setTitle] = useState('');
  const [quizInProgress, setQuizInProgress] = useState(false);
  const [quizOver, setQuizOver] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prevState) => prevState + 1);
    } else {
      setIncorrectAnswers((prevState) => prevState + 1);
    }
  };

  const saveQuizResults = () => {
    Client.saveQuiz(user.id, correctAnswers, incorrectAnswers, title)
      .then(() => {})
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const endQuiz = () => {
    setQuizOver(true);
    setQuizInProgress(false);
    if (correctAnswers > 0) {
      saveQuizResults();
    }
  };

  const moveToNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevState) => prevState + 1);
    } else {
      endQuiz();
    }
  };

  const onStart = () => {
    setQuizInProgress(true);
  };

  const getQuiz = (quizAPIUrl: string, topicName: string) => {
    if (!quizAPIUrl.length || !topicName.length) {
      return;
    }

    Client.getQuiz(quizAPIUrl, topicName)
      .then((res) => {
        const { quizResults, topicName: title } = res.data.data;
        setQuestions(quizResults);
        setTitle(title);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (location.state === null) {
      navigate('/');
    } else {
      getQuiz(location.state.quizAPIUrl, location.state.topicName);
    }
  }, [navigate, location.state]);

  return (
    <Box minH="500px" color="#fff" bg="bg.primary" p="1rem" borderRadius={8}>
      <Box backgroundSize="100%" backgroundPosition="top" backgroundImage={`url(${quizImg})`}>
        <Box borderRadius={4} p="1rem" bg="rgba(0, 0, 0, 0.75)">
          <Heading pt="3rem" textAlign="center" as="h2">
            {title}
          </Heading>
        </Box>

        {!quizInProgress && quizOver && (
          <Flex
            flexDir="column"
            borderRadius={4}
            mx="auto"
            my="3rem"
            justify="center"
            p="2rem"
            bg="rgba(0, 0, 0, 0.85)"
            width={['100%', '350px', '350px']}
            color="#fff"
          >
            <Heading mx="auto" textAlign="center" as="h4" fontSize="1.6rem">
              Congratulations!
            </Heading>
            <Text
              mx="auto"
              pb="0.25rem"
              width="160px"
              borderBottom="2px solid"
              borderColor="blue.500"
              textAlign="center"
              my="1rem"
              fontWeight="bold"
            >
              You scored {correctAnswers} out of {correctAnswers + incorrectAnswers} correctly
            </Text>
            <Flex justify="center">
              <Image src={celebratioImg} alt="celebration with bell and confetti" />
            </Flex>
            <Flex my="2rem" justify="center">
              <RouterLink to="/create-quiz">
                <Button colorScheme="blue">Try another quiz</Button>
              </RouterLink>
            </Flex>
            <Flex justify="center">
              <ConfettiExplosion force={0.6} duration={2500} particleCount={80} width={1000} />
            </Flex>
          </Flex>
        )}

        {!quizInProgress && !quizOver && (
          <Flex
            flexDir="column"
            borderRadius={4}
            mx="auto"
            my="3rem"
            justify="center"
            p="2rem"
            bg="rgba(0, 0, 0, 0.75)"
            width={['100%', '350px', '350px']}
          >
            {questions.length > 0 && (
              <Box mx="auto" mb="2rem">
                <Text fontSize="1.2rem" fontWeight="bold">
                  Difficulty
                </Text>
                <Text fontSize="1.2rem" fontWeight="bold">
                  {questions[0].difficulty}
                </Text>
              </Box>
            )}
            <Flex justify="center">
              <Button onClick={onStart} width="125px" size="lg" colorScheme="blue">
                Start
              </Button>
            </Flex>
            <Text width="80px" borderBottom="2px solid" borderColor="blue.500" fontSize="1.2rem" fontWeight="bold">
              {questions.length} questions
            </Text>
          </Flex>
        )}
        {quizInProgress && !quizOver && (
          <Question
            question={questions[questionIndex].question}
            questionIndex={questionIndex}
            correctAnswer={questions[questionIndex].correctAnswer}
            incorrectAnswers={questions[questionIndex].incorrectAnswers}
            moveToNextQuestion={moveToNextQuestion}
            handleAnswer={handleAnswer}
          />
        )}
      </Box>
    </Box>
  );
};

export default Quiz;
