import { FormControl, Input, FormLabel, Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ICourse, IProfileContext } from '../../../interfaces';
import { nanoid } from 'nanoid';
import { ProfileContext } from '../../../context/profile';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Client } from '../../../util/client';

const SchoolCourseInput = () => {
  const [course, setCourse] = useState('');
  const MAX_COURSES = 5;
  const MAX_COURSE_LENGTH = 50;
  const { profile, handleSetProfile } = useContext(ProfileContext) as IProfileContext;
  const [error, setError] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourse(e.target.value);
  };

  const updateCourses = (courses: string) => {
    Client.updateProfileCourses(courses, profile.id)
      .then(() => {})
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      setError('');

      const courses = profile.courses === null ? [] : [...profile.courses];

      if (course.trim().length === 0 || courses.length >= MAX_COURSES) {
        return;
      }

      if (course.trim().length > MAX_COURSE_LENGTH) {
        setError(`Course must be less than ${MAX_COURSE_LENGTH} characters`);
        return;
      }

      const updatedCourses = [...courses, { id: nanoid(), name: course }];

      handleSetProfile({ ...profile, courses: updatedCourses });

      const coursesString = transformCoursesToString(updatedCourses);
      updateCourses(coursesString);
      setCourse('');
    }
  };

  const transformCoursesToString = (courses: ICourse[]) => {
    return courses.map((course) => course['name']).join(',');
  };

  const removeCourse = (id: string) => {
    const updatedCourses = [...profile.courses].filter((course) => course.id !== id);
    handleSetProfile({ ...profile, courses: updatedCourses });

    const coursesString = transformCoursesToString(updatedCourses);
    updateCourses(coursesString);
  };

  return (
    <Box mt="3rem">
      <FormControl>
        <FormLabel
          htmlFor="course"
          fontSize="1.2rem"
          display="block"
          pb="2.5rem"
          textTransform="uppercase"
        >
          Enrolled courses
        </FormLabel>
        {error.length > 0 && (
          <Text color="red" my="0.25rem">
            {error}
          </Text>
        )}
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
      {profile.courses !== null && (
        <Flex flexWrap="wrap">
          {profile.courses.map(({ id, name }) => {
            return (
              <Flex
                borderRadius={2}
                background="#bab6b6"
                padding="0.5rem"
                m="1rem"
                color="text.secondary"
                align="center"
                key={id}
                justifyContent="space-around"
              >
                <Text fontWeight="bold" fontSize="1.2rem">
                  {name}
                </Text>
                <Box
                  ml="1rem"
                  fontSize="1.2rem"
                  cursor="pointer"
                  onClick={() => removeCourse(id)}
                >
                  <AiOutlineCloseCircle />
                </Box>
              </Flex>
            );
          })}
        </Flex>
      )}
    </Box>
  );
};

export default SchoolCourseInput;
