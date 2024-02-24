import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useState, useRef, useContext } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

import fireImg from '../../../assets/fire.png';
import trophyImg from '../../../assets/trophy.png';

import Calendar from 'react-calendar';
import { Client } from '../../../util/client';
import { UserContext } from '../../../context/user';
import { IStreakStat, IUserContext } from '../../../interfaces';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Streak = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const [value, onChange] = useState<Value>(new Date());
  const [streaks, setStreaks] = useState<Dayjs[]>([]);
  const [streakStat, setStreakStat] = useState<IStreakStat>({ setsStudied: 0, weeklyStreak: 0 });

  const getStreakStats = () => {
    Client.getStreakStats(user.id)
      .then((res) => {
        const { data } = res.data;
        setStreakStat((prevState) => ({
          ...prevState,
          ...data,
        }));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const getStreaks = (month: number, year: number) => {
    Client.getStreak(user.id, 'month', month, year)
      .then((res) => {
        const { data } = res.data;
        const dates: Dayjs[] = [];
        for (const streak of data) {
          dates.push(dayjs(streak.createdAt).startOf('day'));
        }
        setStreaks(dates);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getStreaks(dayjs().month() + 1, dayjs().year());
      getStreakStats();
    }
  }, [shouldRun.current, user.id]);

  const addStreak = (tileDate: Dayjs) => {
    return streaks.filter((streak) => streak.isSame(tileDate));
  };

  return (
    <Box p="1rem" bg="form.primary" minH="250px" borderRadius={8} boxShadow="md">
      <Heading fontSize="1.8rem" as="h3">
        Recent activity
      </Heading>
      <Flex flexDir={['column', 'row', 'row']} mx="auto" align="center" justify="space-around" my="3rem" width="95%">
        {streakStat.setsStudied > 0 ? (
          <Box position="relative">
            <Text textAlign="center">Sets studied</Text>
            <Image src={trophyImg} alt="a golden trophy" />
            <Text fontSize="1.6rem" color="#000" fontWeight="bold" position="absolute" top="40px" left="45px">
              {streakStat.setsStudied}
            </Text>
          </Box>
        ) : (
          <Text>You haven't studied any sets</Text>
        )}

        <Box className="container">
          <Calendar
            onActiveStartDateChange={({ activeStartDate }) => {
              getStreaks(dayjs(activeStartDate).month() + 1, dayjs(activeStartDate).year());
            }}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const tileDate = dayjs(date);
                for (const streak of streaks) {
                  if (streak.isBetween(tileDate.startOf('week'), tileDate.endOf('week'))) {
                    return 'streak';
                  }
                }
              }
            }}
            tileDisabled={() => true}
            tileContent={({ date, view }) => {
              const tileDate = dayjs(date);
              const [streak] = addStreak(tileDate);
              return view === 'month' && streak ? (
                <div className="tile-content">
                  <img src={fireImg} />
                  <p>{streak.date()}</p>
                </div>
              ) : null;
            }}
            formatShortWeekday={(_, date) => dayjs(date).format('dd').slice(0, 1)}
            className={['calendar']}
            onChange={onChange}
            prev2Label={null}
            next2Label={null}
            value={value}
          />
        </Box>
        {streakStat.weeklyStreak > 0 ? (
          <Box position="relative">
            <Text>Current Weekly Streak</Text>
            <Image src={fireImg} alt="a flame that is orange and red" />
            <Text fontSize="1.6rem" color="#000" fontWeight="bold" position="absolute" top="70px" left="45px">
              {streakStat.weeklyStreak}
            </Text>
          </Box>
        ) : (
          <Text>You currently do not have a streak</Text>
        )}
      </Flex>
    </Box>
  );
};

export default Streak;
