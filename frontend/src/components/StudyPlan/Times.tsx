import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export interface ITimesProps {
  addTime: (startTime: string, endTime: string) => void;
}

const Times = ({ addTime }: ITimesProps) => {
  const toast = useToast();
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');

  const handleOnChange = (time: any, typeOf: string) => {
    typeOf === 'start' ? setStartTime(time) : setEndTime(time);
  };

  const onAddTime = () => {
    if (startTime !== null && endTime !== null) {
      addTime(startTime, endTime);
      toast({
        title: 'Success!',
        description: 'Time slot added',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="form.primary" minH="300px" borderRadius={8} p="1rem">
      <Box maxW="100%" w={['100%', '100%', '40%']}>
        <Box my="1rem">
          <Heading as="h3" color="primary.light" fontSize="1.8rem">
            Select times you are able to study at
          </Heading>
        </Box>
        <Flex my="1rem" align="center">
          <Box mx="1rem">
            <Text mb="0.25rem" color="primary.light">
              Start time
            </Text>
            <TimePicker className="time-picker" onChange={(time) => handleOnChange(time, 'start')} value={startTime} />
          </Box>
          <Box mx="1rem">
            <Text mb="0.25rem" color="primary.light">
              End time
            </Text>
            <TimePicker className="time-picker" onChange={(time) => handleOnChange(time, 'end')} value={endTime} />
          </Box>
        </Flex>
        <Flex justify="flex-end">
          <Button onClick={onAddTime}>Add time</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Times;
