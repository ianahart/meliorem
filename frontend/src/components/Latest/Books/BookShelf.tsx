import { IBook } from '../../../interfaces';
import { Box, Flex, Image } from '@chakra-ui/react';
import bookImg from '../../../assets/book.png';
import { useNavigate } from 'react-router-dom';

export interface IBookShelfProps {
  data: IBook[];
}

const BookShelf = ({ data }: IBookShelfProps) => {
  const navigate = useNavigate();

  const navigateToBook = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <Box as="section">
      <Flex flexDir="row">
        {data.map((book) => {
          return (
            <Flex
              onClick={() => navigateToBook(book.id)}
              cursor="pointer"
              flexDir="column"
              justify="space-between"
              color="#fff"
              mx="1rem"
              p="1rem"
              bg="form.primary"
              width={['100%', '100%', '200px']}
              boxShadow="md"
              borderRadius={8}
              minH="120px"
              borderBottom="1px solid"
              borderBottomColor="form.primary"
              as="section"
              key={book.id}
              _hover={{ borderBottomColor: 'primary.dark' }}
            >
              <Image
                width={['100%', '100%', '200px']}
                src={book.imageUrl !== null && book.imageUrl.length ? book.imageUrl : bookImg}
                alt={book.title.slice(0, 10)}
              />
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default BookShelf;
