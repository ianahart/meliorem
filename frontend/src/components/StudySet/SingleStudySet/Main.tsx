import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Client } from '../../../util/client';
import { useNavigate, useParams } from 'react-router-dom';
import { studySetState } from '../../../data';
import { IStudySet } from '../../../interfaces';
import UserAvatar from '../../Shared/UserAvatar';
import StudySetOptions from './Options/StudySetOptions';

interface IMainProps {
  studySetId: number;
}

const Main = ({ studySetId }: IMainProps) => {
  console.log(studySetId);
  const params = useParams();
  const [studySet, setStudySet] = useState<IStudySet>(studySetState);
  const shouldRun = useRef(true);
  const navigate = useNavigate();

  const handleOnBookMark = (isBookMarked: boolean, id: number) => {
    setStudySet((prevState) => ({
      ...prevState,
      bookMark: { ...prevState['bookMark'], isBookMarked, id },
    }));
  };

  const getStudySet = () => {
    let ssId = Number(params.studySetId as string);

    Client.getStudySet(ssId)
      .then((res) => {
        const { data } = res.data;
        setStudySet(data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate('*');
        }
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getStudySet();
    }
  }, [shouldRun.current]);

  return (
    <Box fontSize="1.2rem" p="1rem" color="#fff">
      <Flex justify="space-between">
        <Flex align="center">
          <UserAvatar
            fontSize="1.2rem"
            width="40px"
            height="40px"
            fullName={studySet.fullName}
            avatarUrl={studySet.avatarUrl}
          />
          <Box ml="1rem">
            <Text fontSize="0.9rem">Created by</Text>
            <Text fontSize="1rem" fontWeight="bold">
              {studySet.fullName}
            </Text>
          </Box>
        </Flex>
        <StudySetOptions studySet={studySet} handleOnBookMark={handleOnBookMark} />
      </Flex>
      <Box my="1.5rem">
        <Text fontWeight="bold" my="0.5rem">
          {studySet.schoolName}
        </Text>
        <Text my="0.5rem">{studySet.folder}</Text>
        <Text my="0.5rem">{studySet.course}</Text>
        <Text my="0.5rem" w={['100%', '100%', '50%']}>
          {studySet.description}
        </Text>
      </Box>
    </Box>
  );
};

export default Main;
