import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Client } from '../util/client';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';
import { useNavigate } from 'react-router-dom';

const AdminCreateBookRoute = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    name === 'topic' ? setTopic(value) : setTitle(value);
  };

  const isValidated = () => {
    const MAX_CHARS = 75;
    const isTitleValid = title.trim().length === 0 || title.length > MAX_CHARS;
    const isTopicValid = topic.trim().length === 0 || topic.length > MAX_CHARS;

    return !isTitleValid && !isTopicValid;
  };

  const createBook = () => {
    Client.createBook(title, topic, user.id)
      .then((res) => {
        console.log(res);
        navigate('/admin/dashboard');
        toast({
          title: 'Book(s) created.',
          description: "We've created your books",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        navigate('/admin/dashboard');
        throw new Error(err.message);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!isValidated()) {
      setError('Please make sure title and topic are less than 75 characters');
      return;
    }
    createBook();
  };

  return (
    <Box color="#fff" minH="700px" maxW="100%" w={['100%', '100%', '500px']} p="0.5rem">
      <Box p="2rem">
        <Box mb="5rem">
          <Heading>Create textbook</Heading>
        </Box>
        <Box>
          <form onSubmit={handleOnSubmit}>
            {error.length > 0 && (
              <Box>
                <Text color="red.400">{error}</Text>
              </Box>
            )}
            <FormControl mt="1.5rem" mb="3rem">
              <FormLabel htmlFor="topic" fontSize="1.2rem">
                Topic
              </FormLabel>
              <Text mb="0.25rem" color="gray.500">
                A topic is something like math, or history
              </Text>
              <Input
                onChange={handleOnChange}
                value={topic}
                id="topic"
                name="topic"
                borderColor="gray.600"
                height="35px"
              />
            </FormControl>
            <FormControl my="3rem">
              <FormLabel htmlFor="title" fontSize="1.2rem">
                Title
              </FormLabel>
              <Text color="gray.500">A title is something like calculus or medieval history</Text>
              <Input
                onChange={handleOnChange}
                value={title}
                id="title"
                name="title"
                borderColor="gray.600"
                height="35px"
              />
            </FormControl>
            <Flex>
              <Button type="submit" size="lg" colorScheme="purple">
                Create
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminCreateBookRoute;
