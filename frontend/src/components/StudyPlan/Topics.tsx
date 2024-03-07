import { Box, Heading, Stack, Checkbox } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { ITopic } from '../../interfaces';
import { Client } from '../../util/client';
import { capitalize } from 'lodash';

interface ITopicsProps {
  toggleTopics: (topic: string, checked: boolean) => void;
}

const Topics = ({ toggleTopics }: ITopicsProps) => {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const shouldRun = useRef(true);

  const getTopics = () => {
    Client.getTopics()
      .then((res) => {
        const { data } = res.data;
        setTopics(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getTopics();
    }
  }, [shouldRun.current]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    toggleTopics(value, checked);
  };

  return (
    <Box bg="form.primary" minH="300px" borderRadius={8} p="1rem">
      <Box my="1rem">
        <Heading as="h3" color="primary.light" fontSize="1.8rem">
          {topics.length <= 0 ? 'Go to your profile and add your topics' : 'Select what topics you want to study'}
        </Heading>
        <Box my="2rem">
          <Stack spacing={5} direction="row">
            {topics.map(({ id, name }) => {
              return (
                <Checkbox onChange={handleOnChange} colorScheme="purple" color="primary.light" key={id} value={name}>
                  {capitalize(name)}
                </Checkbox>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Topics;
