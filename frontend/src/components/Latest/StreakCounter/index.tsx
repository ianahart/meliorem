import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IStreak, IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';
import fireImg from '../../../assets/fire.png';

//@ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { nanoid } from 'nanoid';
dayjs.extend(relativeTime);

const StreakCounter = () => {
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [streaks, setStreaks] = useState<IStreak[]>([]);

  const days = useMemo(() => {
    if (streaks.length) {
      const endOfWeek = new Date();

      endOfWeek.setDate(streaks[0].day + 6);

      let startOfWeekNum = dayjs(endOfWeek).subtract(6, 'day');
      const endOfWeekNum = dayjs(endOfWeek);

      const days: { name: string; day: number; isStreaked: boolean }[] = [];
      let loopCounter = 0;
      while (!startOfWeekNum.isSame(endOfWeekNum)) {
        if (loopCounter !== 0) {
          startOfWeekNum = startOfWeekNum.add(1, 'day');
        }
        days.push({
          name: startOfWeekNum.format('ddd'),
          day: startOfWeekNum.date(),
          isStreaked: false,
        });
        loopCounter++;
      }

      return days.map((day, i) => {
        if (streaks[i] && streaks[i].day === day.day) {
          day.isStreaked = true;
        }
        return day;
      });
    }
  }, [streaks]);

  const streakCount = useMemo(() => {
    if (days) {
      return days.filter(
        (day, index) => day.isStreaked && days[index === 0 ? 0 : index - 1].isStreaked
      );
    }
  }, [days]);

  const getStreakCounter = () => {
    Client.getStreak(user.id)
      .then((res) => {
        const { data } = res.data;
        setStreaks(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getStreakCounter();
    }
  }, [shouldRun.current, user.id]);

  return (
    <Box
      minH="120px"
      bg="form.primary"
      width={['95%', '95%', '60%']}
      mx={['auto', 'auto', 'unset']}
      ml="1rem"
      borderRadius={8}
    >
      <Flex justify="space-around" align="center" minH="120px">
        <Box>
          <Box position="relative">
            <Image src={fireImg} alt="a fire emoji flame" />
            <Text
              top="60%"
              left="45%"
              fontWeight="bold"
              position="absolute"
              fontSize="1.4rem"
              color="black"
            >
              {streakCount?.length}
            </Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize="1.2rem" color="#fff" fontWeight="bold">
            {streakCount?.length}-day streak
          </Text>

          <Text color="#fff" mt="0.5rem">
            Study{' '}
            <Box as="span" fontWeight="bold">
              tomorrow
            </Box>{' '}
            to keep your streak going!
          </Text>
        </Box>
        {days && (
          <Flex align="center" flexDir="column">
            <Flex w="120px" justify="space-between">
              {days.map((day) => {
                return (
                  <Box key={nanoid()}>
                    <Text color="#fff">{day.name.slice(0, 1)}</Text>
                  </Box>
                );
              })}
            </Flex>
            <Flex
              w="130px"
              mt="0.5rem"
              justify="space-between"
              borderRadius={20}
              bg="#2a2a3f"
              p="0.5rem  0.25rem"
            >
              {days.map((day, index) => {
                return (
                  <Box key={nanoid()}>
                    <Text
                      fontWeight="bold"
                      color={
                        day.isStreaked && days[index === 0 ? 0 : index - 1].isStreaked
                          ? '#fff'
                          : 'black'
                      }
                    >
                      {day.day}
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default StreakCounter;
