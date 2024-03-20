import { Box, Flex, Heading } from '@chakra-ui/react';
import Topics from './Topics';
import Streak from './Streak';
import Quiz from './Quiz';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar, Event, dayjsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Client } from '../../util/client';
import Books from './Books';

const DnDcalendar = withDragAndDrop(Calendar);

const localizer = dayjsLocalizer(dayjs);

export interface ITimeSlot {
  startTime: number;
  endTime: number;
  id: number;
  title: string;
  day: number;
}

const Profile = () => {
  const shouldRun = useRef(true);
  const [events, setEvents] = useState<Event[]>([]);

  const createEvents = (events: ITimeSlot[]) => {
    const daysInMonth: Dayjs[] = [];
    const eventsToRender: any = [];

    for (let i = 0; i < dayjs().daysInMonth(); i++) {
      daysInMonth.push(dayjs().day(i));
    }

    daysInMonth.forEach((day) => {
      const [match] = events.filter((event) => event.day === day.day());
      if (match) {
        eventsToRender.push({
          resource: nanoid(),
          title: match.title,
          start: dayjs(day).hour(match.startTime).toDate(),
          end: dayjs(day).hour(match.endTime).toDate(),
          day: day.day(),
          id: match.id,
        });
      }
    });

    setEvents(eventsToRender);
  };

  const fetchEvents = () => {
    Client.getTimeSlots()
      .then((res) => {
        createEvents(res.data.data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      fetchEvents();
    }
  }, [shouldRun.current]);

  const updateTimeSlot = (day: number, id: number) => {
    Client.updateTimeSlot(day, id)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  };

  const onEventChange = (data: any) => {
    const { start, end, event } = data;
    const updatedEvents = events.map((e) => {
      if (e.resource === event.resource) {
        const newDay = dayjs(data.start).day();
        updateTimeSlot(newDay, event.id);
        return { ...e, start, end };
      } else {
        return { ...e };
      }
    });
    setEvents(updatedEvents);
  };

  return (
    <Box mt="5rem" mx="auto" w="100%" maxW={['95%', '95%', '800px']}>
      <Flex mb="2rem">
        <Heading as="h2">Your profile</Heading>
      </Flex>
      <Box my="2rem">
        <Topics />
      </Box>
      <Box my="2rem">
        <Streak />
      </Box>
      <Box my="2rem">
        <Quiz />
      </Box>
      <Box my="2rem">
        <Books />
      </Box>
      <Box bg="form.primary">
        <DnDcalendar
          defaultView="month"
          onEventDrop={onEventChange}
          onEventResize={onEventChange}
          localizer={localizer}
          events={events}
          style={{ height: 500, marginBottom: '30px' }}
        />
      </Box>
    </Box>
  );
};

export default Profile;
