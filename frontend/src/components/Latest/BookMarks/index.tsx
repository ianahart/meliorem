import { useMediaQuery, Box, Flex, Heading, chakra, shouldForwardProp } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IStudySet, IUserContext } from '../../../interfaces';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Client } from '../../../util/client';
import StudySets from '../StudySets';
import { AnimatePresence, isValidMotionProp, motion } from 'framer-motion';
import BasicSpinner from '../../Shared/BasicSpinner';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const BookMarks = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [studySets, setStudySets] = useState<IStudySet[]>([]);
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const [isLoading, setIsLoading] = useState(false);
  const shouldRun = useRef(true);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
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

  const getYourStudySets = (paginate: boolean, dir: string) => {
    const pageNum = paginate ? pagination.page : -1;
    setIsLoading(true);

    Client.getBookMarks(user.id, pageNum, pagination.pageSize, dir)
      .then((res) => {
        const { direction, totalElements, totalPages, page, pageSize, items } = res.data.data;
        setPagination({
          ...pagination,
          direction,
          totalElements,
          totalPages,
          page,
          pageSize,
        });
        setStudySets(items);
        if (paginate) {
          setSeconds(Math.random());
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getYourStudySets(false, 'next');
    }
  }, [shouldRun.current, user.id]);

  const handleOnMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems={['center', 'center', 'flex-start']}
      as="section"
    >
      <Box display="flex" flexDir="column" alignItems="flex-start">
        <Flex align="center">
          <Heading as="h2" fontSize="2rem" color="#fff">
            Your Bookmarks
          </Heading>
        </Flex>
        <Box
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          display="flex"
          justifyContent="flex-start"
          pos="relative"
          my="2rem"
          as="section"
        >
          {pagination.page > 0 && isMouseOver && (
            <Flex
              onClick={() => getYourStudySets(true, 'prev')}
              cursor="pointer"
              flexDir="column"
              align="center"
              justify="center"
              borderRadius={50}
              bg="gray.500"
              fontSize="2rem"
              top="50%"
              pos="absolute"
              left="0"
              color="#fff"
            >
              <FaArrowLeft />
            </Flex>
          )}
          <AnimatePresence mode="wait">
            <MotionBox
              key={seconds}
              initial={{ x: 100, opacity: 0 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              exit={{ x: 100, opacity: 0 }}
            >
              {!isLoading ? (
                <StudySets isBookMarked={true} data={studySets} />
              ) : (
                <BasicSpinner color="#fff" message="Loading bookmarks..." />
              )}
            </MotionBox>
          </AnimatePresence>

          {pagination.page < pagination.totalPages - 1 && isMouseOver && (
            <Flex
              onClick={() => getYourStudySets(true, 'next')}
              cursor="pointer"
              flexDir="column"
              align="center"
              justify="center"
              borderRadius={50}
              bg="gray.500"
              fontSize="2rem"
              top="50%"
              pos="absolute"
              right="0"
              color="#fff"
            >
              <FaArrowRight />
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BookMarks;
