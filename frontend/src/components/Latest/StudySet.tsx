import { IStudySet } from '../../interfaces';
import { Flex, Text, Box, Heading } from '@chakra-ui/react';
import UserAvatar from '../Shared/UserAvatar';
import { useNavigate } from 'react-router-dom';
import { BsFillBookmarkFill } from 'react-icons/bs';

interface IStudySetProps {
  data: IStudySet;
  isBookMarked: boolean;
}

const StudySet = ({ data, isBookMarked }: IStudySetProps) => {
  const navigate = useNavigate();

  const navigateToStudySet = () => {
    navigate(`/studysets/${data.id}`, { state: { title: data.title } });
  };

  return (
    <Flex
      onClick={navigateToStudySet}
      cursor="pointer"
      flexDir="column"
      justify="space-between"
      color="#fff"
      mx="1rem"
      p="1rem"
      bg="form.primary"
      width={['100%', '100%', '200px']}
      boxShadow="md"
      borderRadius={8}
      minH="120px"
      borderBottom="1px solid"
      borderBottomColor="form.primary"
      as="section"
      _hover={{ borderBottomColor: 'primary.dark' }}
    >
      <Box>
        <Flex align="center" justify="space-between">
          <Heading as="h4" fontSize="1.2rem" overflowWrap="break-word">
            {data.title}
          </Heading>
          {isBookMarked && (
            <Box color="gold">
              <BsFillBookmarkFill />
            </Box>
          )}
        </Flex>
        <Flex
          mt="0.5rem"
          flexDir="column"
          align="center"
          width="50px"
          justify="center"
          bg="gray.500"
          borderRadius={20}
          padding="0.25rem"
        >
          <Text color="#fff">{data.totalStudySetCards} terms</Text>
        </Flex>
      </Box>
      <Flex align="center">
        <UserAvatar avatarUrl={data.avatarUrl} fullName={data.fullName} width="22px" height="22px" fontSize="1rem" />
        <Box ml="0.5rem">
          <Text>{data.fullName}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default StudySet;
