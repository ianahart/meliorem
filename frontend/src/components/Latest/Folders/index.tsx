import { Box, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { FaFolder } from 'react-icons/fa';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

const Folders = () => {
  const navigate = useNavigate();
  const shouldRun = useRef(true);
  const [folders, setFolders] = useState<{ folder: string }[]>([]);
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  useEffect(() => {
    if (isMobile) {
      setIsMouseOver(true);
    } else {
      setIsMouseOver(false);
    }
  }, [isMobile]);

  const getUserFolders = (paginate: boolean, direction: string) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getUserFolders(pageNum, pagination.pageSize, direction)
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
        setFolders(items);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getUserFolders(false, 'next');
    }
  }, [shouldRun.current]);

  const handleOnMouseEnter = () => setIsMouseOver(true);

  const handleOnMouseLeave = () => setIsMouseOver(false);

  const goToFolder = (folder: string) => {
    let slugifiedFolder = '';

    for (const char of folder) {
      slugifiedFolder += char === ' ' ? '-' : char;
    }

    navigate(`/folders/${slugifiedFolder.toLowerCase()}`);
  };

  return (
    <Box
      as="section"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems={['center', 'center', 'flex-start']}
    >
      <Heading as="h2" fontSize="2rem" color="#fff">
        Your folders
      </Heading>

      <Flex
        position="relative"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        align="center"
        my="1rem"
        minH="120px"
        width={['95%', '95%', '80%']}
        maxWidth="760px"
        overflowX="auto"
        overflowY="hidden"
        borderRadius={8}
        flexWrap={['wrap', 'wrap', 'nowrap']}
      >
        {pagination.page > 0 && isMouseOver && (
          <Box
            onClick={() => getUserFolders(true, 'prev')}
            color="#fff"
            bg="gray.500"
            width="32px"
            height="32px"
            borderRadius={50}
            display="flex"
            flexDir="column"
            alignItems="center"
            left="0"
            justifyContent="center"
            position="absolute"
            fontSize="1.6rem"
          >
            <FaArrowLeft />
          </Box>
        )}

        {pagination.page < pagination.totalPages - 1 && isMouseOver && (
          <Box
            onClick={() => getUserFolders(true, 'next')}
            color="#fff"
            bg="gray.500"
            width="32px"
            height="32px"
            borderRadius={50}
            display="flex"
            flexDir="column"
            alignItems="center"
            right="105px"
            justifyContent="center"
            position="absolute"
            fontSize="1.6rem"
          >
            <FaArrowRight />
          </Box>
        )}

        {folders.map(({ folder }) => {
          return (
            <Flex
              onClick={() => goToFolder(folder)}
              cursor="pointer"
              flexDir="column"
              justify="space-between"
              color="#fff"
              mx="1rem"
              p="1rem"
              my={['1rem', '1rem', '0']}
              bg="form.primary"
              width={['100%', '100%', '200px']}
              boxShadow="md"
              borderRadius={8}
              minH="120px"
              borderBottom="1px solid"
              borderBottomColor="form.primary"
              as="section"
              _hover={{ borderBottomColor: 'primary.dark' }}
              key={nanoid()}
            >
              <Flex align="center">
                <Box color="gray.500" mr="0.5rem" fontSize="1.6rem">
                  <FaFolder />
                </Box>
                <Text fontWeight="bold" fontSize="1.6rem" wordBreak="break-all">
                  {folder}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Folders;
