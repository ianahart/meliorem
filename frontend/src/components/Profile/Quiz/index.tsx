import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { trophies } from '../../../data';
import { FaTrophy } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import { IQuiz } from '../../../interfaces';
//@ts-ignore
import dayjs from 'dayjs';

const Quiz = () => {
  const shouldRun = useRef(true);
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const getQuizzes = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getQuizzes(pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { items, direction, page, pageSize, totalElements, totalPages } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
          totalElements,
        }));

        setQuizzes((prevState) => [...prevState, ...items]);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getQuizzes(false);
    }
  }, [shouldRun.current]);

  const percentitize = (incorrectAnswers: number, correctAnswers: number) => {
    const total = incorrectAnswers + correctAnswers;

    const percent = (correctAnswers / total) * 100;

    return `${percent}%`;
  };

  return (
    <Box p="1rem" bg="form.primary" minH="250px" borderRadius={8} boxShadow="md">
      <Heading fontSize="1.8rem" as="h3">
        Quizzes you've taken
      </Heading>
      <Flex flexWrap="wrap" mx="auto" align="center" justify="flex-start" my="3rem" width="95%">
        {quizzes.map((quiz) => {
          return (
            <Flex m="2rem" flexDir="column" align="center" key={quiz.id}>
              <Box fontSize="3rem" color={trophies[quiz.correctAnswers]}>
                <FaTrophy />
              </Box>
              <Box>
                <Text textAlign="center" fontWeight="bold">
                  {quiz.category}
                </Text>
                <Text textAlign="center">completed on {dayjs(quiz.createdAt).format('MM/DD/YYYY')}</Text>
                <Text fontSize="2rem" textAlign="center">
                  {percentitize(quiz.incorrectAnswers, quiz.correctAnswers)}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
      {pagination.page < pagination.totalPages - 1 && (
        <Flex my="1.5rem" justify="center">
          <Button onClick={() => getQuizzes(true)}>More results</Button>
        </Flex>
      )}
    </Box>
  );
};

export default Quiz;
