import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { daysData } from '../../data';
import Days from './Days';
import Topics from './Topics';
import Times from './Times';
import { ITime } from '../../interfaces';
import { Client } from '../../util/client';
import { useNavigate } from 'react-router-dom';
const StudyPlan = () => {
  const navigate = useNavigate();
  const [studyDays, setStudyDays] = useState<{ day: number; name: string }[]>(daysData);
  const [selectedStudyDays, setSelectedStudyDays] = useState<{ day: number; name: string }[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<ITime[]>([]);
  const [error, setError] = useState('');

  const addTime = (startTime: string, endTime: string) => {
    if (startTime === endTime) return;

    const exists = selectedTimes.find((time) => time.startTime === startTime && time.endTime === endTime);
    if (!exists) {
      setSelectedTimes((prevState) => [...prevState, { startTime, endTime }]);
    }
  };

  const onSelectStudyDay = (selectedDay: { day: number; name: string }) => {
    if (selectedStudyDays.includes(selectedDay)) {
      return;
    }
    setSelectedStudyDays((prevState) => [...prevState, selectedDay]);
    setStudyDays((prevState) => prevState.filter((studyDay) => studyDay.name !== selectedDay.name));
  };

  const onDeSelectStudyDay = (deSelectedDay: { day: number; name: string }) => {
    setSelectedStudyDays((prevState) => prevState.filter((studyDay) => studyDay.name !== deSelectedDay.name));
    setStudyDays((prevState) => [...prevState, deSelectedDay]);
  };

  const toggleTopics = (topic: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics((prevState) => [...prevState, topic]);
    } else {
      setSelectedTopics((prevState) => prevState.filter((t) => t !== topic));
    }
  };

  const onGenerateStudyPlan = () => {
    setError('');
    if (selectedStudyDays.length < selectedTopics.length) {
      setError("You haven't selected enough study days yet");
      return;
    }

    if (selectedStudyDays.length && selectedTopics.length && selectedTimes.length) {
      Client.createStudyPlan(selectedTimes, selectedTopics, selectedStudyDays)
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }
  };

  return (
    <Box>
      <Box p="1rem" mt="5rem" mx="auto" maxW="100%" w={['100%', '100%', '850px']}>
        <Box my="2rem">
          <Topics toggleTopics={toggleTopics} />
        </Box>
        <Box my="2rem">
          <Days
            studyDays={studyDays}
            selectedStudyDays={selectedStudyDays}
            onSelectStudyDay={onSelectStudyDay}
            onDeSelectStudyDay={onDeSelectStudyDay}
          />
        </Box>
        <Box my="2rem">
          <Times addTime={addTime} />
        </Box>
        <Box my="2rem">
          <Box bg="form.primary" minH="300px" borderRadius={8} p="1rem">
            <Box maxW="100%" w={['100%', '100%', '40%']}>
              <Box my="1rem">
                <Heading mb="2rem" as="h3" color="primary.light" fontSize="1.8rem">
                  Generate a study plan
                </Heading>
              </Box>
              {error.length > 0 && (
                <Text my="2rem" color="red">
                  {error}
                </Text>
              )}
              <Flex>
                <Button onClick={onGenerateStudyPlan} size="lg">
                  Generate
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudyPlan;
