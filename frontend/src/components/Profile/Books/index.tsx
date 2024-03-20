import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IBookProgress, IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';
import { Link as RouterLink } from 'react-router-dom';

const Books = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [bookProgresses, setBookProgresses] = useState<IBookProgress[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const getBookProgresses = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getBookProgresses(user.id, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;

        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
          totalElements,
        }));

        setBookProgresses((prevState) => [...prevState, ...items]);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getBookProgresses(false);
    }
  }, [shouldRun.current, user.id]);

  return (
    <Box p="1rem" bg="form.primary" minH="250px" borderRadius={8} boxShadow="md">
      <Heading fontSize="1.8rem" as="h3">
        Your reading progress
      </Heading>
      <Box my="3rem" width="95%">
        <Flex wrap="wrap">
          {bookProgresses.map((bp) => {
            return (
              <Box mx="1rem" key={bp.id}>
                <RouterLink to={`/books/${bp.bookId}`}>
                  <Image src={bp.imageUrl} />
                </RouterLink>
                <Box>
                  <Heading my="1rem" textAlign="center" fontSize="1.4rem" as="h4">
                    {Math.floor((bp.currentPage / bp.totalPages) * 100)}% completed
                  </Heading>
                  <Flex my="0.5rem" justify="space-between" align="center">
                    <Text color="gray.400">Reading progress</Text>
                    <Text color="gray.400" fontWeight="bold">
                      {bp.currentPage}/{bp.totalPages} pages
                    </Text>
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </Flex>
        {pagination.page < pagination.totalPages - 1 && (
          <Flex my="2rem" justify="center">
            <Button onClick={() => getBookProgresses(true)}>Load more...</Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Books;
