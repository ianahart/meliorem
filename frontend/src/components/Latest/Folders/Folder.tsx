import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/user';
import { IStudySet, IUserContext } from '../../../interfaces';
import { Client } from '../../../util/client';
import UserAvatar from '../../Shared/UserAvatar';
//@ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { deslugify } from '../../../util';
dayjs.extend(relativeTime);

const Folder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [studySets, setStudySets] = useState<IStudySet[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 2,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const folder = params.folder as string;

  const getStudySets = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getStudySets(user.id, pageNum, pagination.pageSize, pagination.direction, folder)
      .then((res) => {
        const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
          totalElements,
        }));
        setStudySets((prevState) => [...prevState, ...items]);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getStudySets(false);
    }
  }, [params.folder]);

  const goToStudySet = (studySetId: number, title: string) => {
    navigate(`/studysets/${studySetId}`, { state: { title } });
  };

  return (
    <Box as="section">
      <Box mx="auto" mt="10rem" as="section" maxW={['95%', '95%', '768px']} w="100%" p="0.5rem">
        <Heading color="#fff" textAlign="center" mb="2rem">
          Your Study sets in{' '}
          <Box as="span" color="primary.dark" fontWeight="bold">
            {deslugify(folder)}
          </Box>
        </Heading>

        {studySets.map((studySet) => {
          return (
            <Flex
              onClick={() => goToStudySet(studySet.id, studySet.title)}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
              my="1.5rem"
              key={studySet.id}
              justify="space-between"
              bg="form.primary"
              borderRadius={8}
              p="0.5rem"
            >
              <Box>
                <Flex align="center">
                  <UserAvatar
                    fullName={studySet.fullName}
                    avatarUrl={studySet.avatarUrl}
                    fontSize="16px"
                    width="40px"
                    height="40px"
                  />
                  <Text color="#fff" fontWeight="bold" ml="0.5rem">
                    {studySet.fullName}
                  </Text>
                </Flex>
                <Text fontSize="0.85rem" mt="0.25rem" fontWeight="bold" color="gray.500">
                  <Box fontStyle="italic" as="span">
                    Created{' '}
                  </Box>
                  {dayjs(studySet.createdAt).format('MM/DD/YYYY')}
                </Text>
              </Box>
              <Flex color="#fff" flexDir="column" justify="center">
                <Text>{studySet.title}</Text>
                <Text>{studySet.course}</Text>
              </Flex>
              <Flex flexDir="column" justify="center" color="#fff">
                <Text>{studySet.schoolName}</Text>
              </Flex>
              <Box height="100%" borderRadius={20} bg="gray.500" p="0.5rem" textAlign="center">
                <Text color="#fff">{studySet.totalStudySetCards} terms</Text>
              </Box>
            </Flex>
          );
        })}
        {pagination.page < pagination.totalPages - 1 && (
          <Flex justify="center" my="2rem">
            <Button onClick={() => getStudySets(true)} colorScheme="purple" size="lg">
              See more
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Folder;
