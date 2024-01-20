import { FormControl, Input, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import { ICourse } from '../../../interfaces';
import { nanoid } from 'nanoid';

const SchoolCourseInput = () => {
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState<ICourse[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourse(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCourses((prevState) => [...prevState, { id: nanoid(), name: course }]);
    }
  };

  return (
    <FormControl mt="3rem">
      <FormLabel
        htmlFor="course"
        fontSize="1.2rem"
        display="block"
        pb="2.5rem"
        textTransform="uppercase"
      >
        Enrolled courses
      </FormLabel>
      <Input
        id="course"
        name="course"
        value={course}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        fontSize="1.2rem"
        _placeholder={{ fontSize: '1.2rem' }}
        placeholder="Enter your course name(e.g., History)"
        border="none"
        autoComplete="off"
        _focus={{ boxShadow: 'none' }}
        borderRadius={0}
        borderBottom="2px solid #fff"
      />
    </FormControl>
  );
};

export default SchoolCourseInput;
