import { AspectRatio, Box, Button, Flex, Heading, Input, Link, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../../util/client';

interface INotesProps {
  studySetId: number;
}

const Notes = ({ studySetId }: INotesProps) => {
  const [error, setError] = useState('');
  const shouldRun = useRef(true);
  const [url, setUrl] = useState('');
  const MAX_FILE_SIZE = 2000000;

  const getNotes = () => {
    Client.getNotes(studySetId)
      .then((res) => {
        setUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getNotes();
    }
  }, [shouldRun.current]);

  const createNotes = (file: File) => {
    if (error.length > 0) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studySetId', studySetId.toString());

    Client.createNotes(formData)
      .then((res) => {
        setUrl(res.data.url);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      setError('Maximum file size is 2MB');
      return;
    }
    createNotes(file);
  };

  return (
    <Box p="1rem" color="#fff">
      <Flex>
        <Heading as="h3" color="#fff" fontSize="1.8rem">
          Notes
        </Heading>
      </Flex>

      <Flex justify="flex-end">
        <Box>
          <Box cursor="pointer" position="relative">
            <Button colorScheme="gray">Upload notes</Button>
            <Input
              opacity={0}
              cursor="pointer"
              left="0"
              width="100%"
              position="absolute"
              accept=".doc, .docx"
              onChange={handleOnChange}
              type="file"
              name="file"
              id="file"
            />
          </Box>
          <Box fontWeight="bold" fontSize="1.2rem" mt="2rem">
            {url.length > 0 && <Link href={url}>Go Fullscreen</Link>}
          </Box>
        </Box>
      </Flex>
      {error.length > 0 && (
        <Text textAlign="right" my="0.25rem">
          {error}
        </Text>
      )}

      <Link href={url}>
        <AspectRatio onClick={() => console.log('run')} maxW="560px" ratio={1}>
          <iframe
            onClick={() => console.log('run')}
            style={{ height: '400px' }}
            title="notes"
            src={url}
            allowFullScreen
          />
        </AspectRatio>
      </Link>
    </Box>
  );
};

export default Notes;
