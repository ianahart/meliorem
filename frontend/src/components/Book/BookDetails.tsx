import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bookImg from '../../assets/book.png';
import { IoMdDownload } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { IBook } from '../../interfaces';
import { bookState } from '../../data';
import { Client } from '../../util/client';
import { AiOutlineBook } from 'react-icons/ai';

const BookDetails = () => {
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

  return (
    <Flex
      mt="5rem"
      bg="bg.primary"
      borderRadius={4}
      boxShadow="md"
      maxW="100%"
      w={['100%', '100%', '500px']}
      p="1rem"
      flexDir="column"
      align="center"
      justify="center"
      color="#fff"
      mx="auto"
    >
      <Image src={book.imageUrl ? book.imageUrl : bookImg} alt="a book cover" />
      <Text my="1rem" lineHeight="1.6" width="50%">
        {book.title}
      </Text>
      <Flex width="50%" justify="space-between">
        <Box>
          <Text>{book.author}</Text>
          <Text my="0.25rem">{book.bookshelf}</Text>
          <Flex align="center">
            <Box fontSize="1.4rem" mr="0.5rem">
              <AiOutlineBook />
            </Box>
            <Text fontWeight="bold" textDecor="underline">
              Read book
            </Text>
          </Flex>
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
    </Flex>
  );
};

export default BookDetails;
