import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../util/client';
import { IBook } from '../interfaces';
import BookCover from '../components/Book/BookCover';

const AdminListBooksRoute = () => {
  const shouldRun = useRef(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 5,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const getBooks = (paginate: boolean, direction: string) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getBooks(pageNum, pagination.pageSize, direction)
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

        setBooks(items);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getBooks(false, 'next');
    }
  }, [shouldRun.current]);

  return (
    <Box color="#fff" minH="700px" maxW="100%" w={['100%', '100%', '500px']} p="0.5rem">
      <Box p="2rem">
        <Flex flexDir="column" align="center">
          {books.map((book) => {
            return (
              <Box my="2rem" key={book.id}>
                <BookCover book={book} />
              </Box>
            );
          })}
          <Flex align="center">
            {pagination.page > 0 && <Button onClick={() => getBooks(true, 'prev')}>Prev</Button>}
            <Text mx="1rem">
              {pagination.page + 1} of {pagination.totalPages}
            </Text>
            {pagination.page < pagination.totalPages - 1 && (
              <Button onClick={() => getBooks(true, 'next')}>Next</Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default AdminListBooksRoute;
