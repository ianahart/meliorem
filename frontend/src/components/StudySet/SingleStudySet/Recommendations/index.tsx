import { Box, Flex, Heading, chakra, shouldForwardProp } from '@chakra-ui/react';
import { AnimatePresence, isValidMotionProp, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../../util/client';
import { IRecommendation } from '../../../../interfaces';
//@ts-ignore
import dayjs from 'dayjs';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import StudySets from '../../../Latest/StudySets';
import BasicSpinner from '../../../Shared/BasicSpinner';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Recommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [recommendations, setRecommendations] = useState<IRecommendation[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });
  const shouldRun = useRef(true);

  const mostRecentRecTimeElapsed = (mostRecentRec: IRecommendation) => {
    const weekAgo = dayjs().subtract(1, 'week');

    return dayjs(mostRecentRec.lastGeneratedAt).isBefore(weekAgo);
  };

  const getRecommendations = async (paginate: boolean, dir: string) => {
    const pageNum = paginate ? pagination.page : -1;

    setIsLoading(true);

    const response = await Client.getRecommendations(pageNum, pagination.pageSize, dir);
    const { items, page, pageSize, totalPages, totalElements, direction } = response.data.data;

    setPagination((prevState) => ({
      ...prevState,
      page,
      pageSize,
      direction,
      totalPages,
      totalElements,
    }));

    setIsLoading(false);
    setRecommendations(items);

    if (paginate) {
      setSeconds(Math.random());
    }

    if (items.length) {
      return mostRecentRecTimeElapsed(items[items.length - 1]);
    }

    return true;
  };

  const handleRecommendations = async (paginate: boolean, direction: string) => {
    try {
      const shouldRunUpdate = await getRecommendations(paginate, direction);

      if (shouldRunUpdate) {
        await createRecommendations();
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const handleOnMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOver(false);
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      handleRecommendations(false, 'next');
    }
  }, [handleRecommendations, shouldRun.current]);

  const createRecommendations = async () => {
    await Client.createRecommendations();
  };

  return (
    <Box width={['100%', '100%', '80%']}>
      <Heading ml="1rem" color="#fff" fontSize="1.6rem">
        Recommendations
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
            onClick={() => getRecommendations(true, 'prev')}
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
              <StudySets isBookMarked={false} data={recommendations} />
            ) : (
              <BasicSpinner color="#fff" message="Loading recommendations..." />
            )}
          </MotionBox>
        </AnimatePresence>

        {pagination.page < pagination.totalPages - 1 && isMouseOver && (
          <Flex
            onClick={() => getRecommendations(true, 'next')}
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
  );
};

export default Recommendations;
