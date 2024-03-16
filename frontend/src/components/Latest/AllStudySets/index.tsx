import { Box, Flex, Heading, chakra, shouldForwardProp, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IStudySet } from '../../../interfaces';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Client } from '../../../util/client';
import StudySets from '../StudySets';
import { AnimatePresence, isValidMotionProp, motion } from 'framer-motion';
import BasicSpinner from '../../Shared/BasicSpinner';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const AllStudySets = () => {
  const [studySets, setStudySets] = useState<IStudySet[]>([]);
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const shouldRun = useRef(true);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const getAllStudySets = (paginate: boolean, dir: string) => {
    const pageNum = paginate ? pagination.page : -1;
    const noUserId = 0;
    setIsLoading(true);
    Client.getStudySets(noUserId, pageNum, pagination.pageSize, dir)
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
    if (shouldRun.current) {
      shouldRun.current = false;
      getAllStudySets(false, 'next');
    }
  }, [shouldRun.current]);

  const handleOnMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <Box
      as="section"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems={['center', 'center', 'flex-start']}
    >
      <Box display="flex" flexDir="column" alignItems="flex-start">
        <Heading as="h2" fontSize="2rem" color="#fff">
          All study sets
        </Heading>
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
              onClick={() => getAllStudySets(true, 'prev')}
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
                <StudySets isBookMarked={false} data={studySets} />
              ) : (
                <BasicSpinner color="#fff" message="Loading all study sets..." />
              )}
            </MotionBox>
          </AnimatePresence>

          {pagination.page < pagination.totalPages - 1 && isMouseOver && (
            <Flex
              onClick={() => getAllStudySets(true, 'next')}
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

export default AllStudySets;
