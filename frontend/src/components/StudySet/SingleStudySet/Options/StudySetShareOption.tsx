import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { IoShareOutline } from 'react-icons/io5';

const StudySetShareOption = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const location = useLocation();

  useEffect(() => {
    setUrl(window.location.href);
  }, [location.pathname, setUrl]);

  const handleSetModalOpen = (open: boolean) => setIsModalOpen(open);

  return (
    <Flex
      onClick={() => handleSetModalOpen(true)}
      minW="30px"
      mx="0.5rem"
      cursor="pointer"
      align="center"
      border="1px solid #fff"
      p="0.25rem"
      borderRadius={2}
    >
      <Box fontSize="1.4rem" mr="0.25rem">
        <IoShareOutline />
      </Box>
      <Text>Share</Text>
      {isModalOpen && (
        <Flex
          flexDir="column"
          align="center"
          justify="center"
          bg="rgba(0, 0, 0, 0.75)"
          top="0"
          left="0"
          w="100%"
          h="100%"
          pos="absolute"
        >
          <Box p="1rem" bg="form.primary" maxW="450px" w="100%" minH="300px" borderRadius={8} boxShadow="md">
            <Flex justify="flex-end">
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  handleSetModalOpen(false);
                }}
                cursor="pointer"
                fontSize="2rem"
                color="#fff"
              >
                <AiOutlineClose />
              </Box>
            </Flex>
            <Box>
              <Heading as="h2">Share this set</Heading>
            </Box>
            <Flex my="2rem" align="center">
              <Box bg="bg.primary" p="0.25rem" borderRadius={8} w="80%">
                <FormControl>
                  <FormLabel htmlFor="url">Set url</FormLabel>
                  <Input
                    p="0"
                    readOnly
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    _focus={{ boxShadow: 'none' }}
                    height="12px"
                    id="url"
                    name="url"
                    type="text"
                    border="none"
                  />
                </FormControl>
              </Box>
              <Box>
                <Button
                  onClick={() => navigator.clipboard.writeText(url)}
                  size="lg"
                  ml="2rem"
                  borderRadius={8}
                  height="40px"
                  colorScheme="purple"
                >
                  Copy link
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default StudySetShareOption;
