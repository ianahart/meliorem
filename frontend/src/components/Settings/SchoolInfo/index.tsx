import { Box, Heading, Text } from '@chakra-ui/react';
import { LuSchool } from 'react-icons/lu';
import SettingsTitle from '../SettingsTitle';
import SettingsContent from '../SettingsContent';
import SettingsContainer from '../SettingsContainer';
import SchoolNameInput from './SchoolNameInput';
import SchoolCourseInput from './SchoolCourseInput';

const SchoolInfo = () => {
  return (
    <SettingsContainer>
      <SettingsTitle>
        <Box color="#fff" fontSize="3rem">
          <LuSchool />
        </Box>
        <Heading as="h4">School Info</Heading>
      </SettingsTitle>
      <SettingsContent>
        <Heading fontSize="2rem" as="h2">
          Update your school information
        </Heading>
        <Box my="1.5rem">
          <Text color="#f4f4f4" fontSize="1.4rem">
            We'll use your school info to recommend study material to you
          </Text>
          <SchoolNameInput />
          <SchoolCourseInput />
        </Box>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default SchoolInfo;
