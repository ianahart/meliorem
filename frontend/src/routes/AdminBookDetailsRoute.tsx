import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Client } from '../util/client';
import { bookState } from '../data';
import { IBook } from '../interfaces';
import bookImg from '../assets/book.png';
import { IoMdDownload } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';

const AdminBookDetailsRoute = () => {
  const navigate = useNavigate();
  const shouldRun = useRef(true);
  const { id } = useParams();
  const [book, setBook] = useState<IBook>(bookState);

  const getBook = (id: number) => {
    Client.getBook(id)
      .then((res) => {
        setBook(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getBook(Number.parseInt(id as string));
    }
  }, [shouldRun.current]);

  const onDeleteBook = (bookId: number) => {
    Client.deleteBook(bookId)
      .then(() => {
        navigate('/admin/dashboard');
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <Flex p="1rem" flexDir="column" align="center" justify="center" color="#fff" mx="auto">
      <Image src={book.imageUrl ? book.imageUrl : bookImg} alt="a book cover" />
      <Text my="1rem" lineHeight="1.6" width="50%">
        {book.title}
      </Text>
      <Flex width="50%">
        <Box>
          <Text>{book.author}</Text>
          <Text>{book.bookshelf}</Text>
        </Box>
        <Flex align="center" mx="1rem">
          <Box mx="0.5rem">
            <IoMdDownload />
          </Box>
          <Box>
            <Text>{book.downloadCount}</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex my="1rem" width="50%" justify="flex-end" cursor="pointer">
        <Tooltip label="Delete book">
          <Box color="gray.400" onClick={() => onDeleteBook(book.id)} fontSize="2rem">
            <BsTrash />
          </Box>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default AdminBookDetailsRoute;
