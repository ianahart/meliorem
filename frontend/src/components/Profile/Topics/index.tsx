import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, Tooltip, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Client } from '../../../util/client';

export interface ITopic {
  id: number;
  name: string;
}

const Topics = () => {
  const TOPIC_LIMIT = 5;
  const shouldRun = useRef(true);
  const toast = useToast();
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState<ITopic[]>([]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const getTopics = () => {
    Client.getTopics()
      .then((res) => {
        const { data } = res.data;
        setTopics(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getTopics();
    }
  }, [shouldRun.current]);

  const createTopics = (names: string[]) => {
    Client.createTopics(names)
      .then(() => {
        toast({
          title: 'Topics saved!',
          description: "We've saved your topics for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!topics.length) {
      return;
    }
    const onlyNames = [...topics].map(({ name }) => name);
    createTopics(onlyNames);
  };

  const addTopic = (topic: string) => {
    const id = topics.length === 0 ? 0 : topics[topics.length - 1].id + 1;
    setTopics((prevState) => [...prevState, { id, name: topic }]);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && topic.trim().length > 0 && topics.length < TOPIC_LIMIT) {
      e.preventDefault();
      addTopic(topic);
      setTopic('');
    }
  };

  const handleOnRemove = (id: number) => {
    const updatedTopics = [...topics].filter((topic) => topic.id !== id);
    setTopics(updatedTopics);
  };

  return (
    <Box p="1rem" bg="form.primary" minH="250px" borderRadius={8} boxShadow="md">
      <Heading fontSize="1.8rem" as="h3">
        Your topics
      </Heading>
      <Box my="3rem" width={['95%', '95%', '65%']}>
        <form onSubmit={handleOnSubmit}>
          <FormControl>
            <FormLabel htmlFor="topic">
              Add topics you're studying {topics.length}/{TOPIC_LIMIT}{' '}
            </FormLabel>
            <Input
              onKeyDown={handleOnKeyDown}
              onChange={handleOnChange}
              value={topic}
              _focus={{ boxShadow: 'none' }}
              border="none"
              borderBottom="2px solid #fff"
              borderRadius={0}
              placeholder="Enter a topic e.g. History"
              type="text"
              id="topic"
              name="topic"
            />
          </FormControl>

          {topics.length === TOPIC_LIMIT && (
            <Flex mt="2rem">
              <Text>You've reached the maximum numbers of topics to add</Text>
            </Flex>
          )}
          <Flex flexWrap="wrap" mt="3rem" mb="1rem">
            {topics.map(({ id, name }) => {
              return (
                <Box
                  boxShadow="lg"
                  border="1px solid"
                  borderColor="bg.dark"
                  borderRadius={20}
                  my="0.5rem"
                  p="0.5rem 1rem"
                  bg="bg.primary"
                  mx="1rem"
                  key={id}
                >
                  <Flex align="center">
                    <Text>{name}</Text>
                    <Tooltip label="Remove">
                      <Box ml="0.5rem" cursor="pointer" onClick={() => handleOnRemove(id)}>
                        <AiOutlineCloseCircle />
                      </Box>
                    </Tooltip>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
          <Flex justify="flex-end" mt="2rem">
            <Button w="100px" size="md" type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
export default Topics;
