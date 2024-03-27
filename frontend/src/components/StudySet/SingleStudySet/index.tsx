import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Client } from '../../../util/client';
import Main from './Main';
import StillLearning from './StillLearning';
import FlashCards from './FlashCards';
import { IStudySetCardFull, IUserContext } from '../../../interfaces';
import { useLocation, useParams } from 'react-router-dom';
import Reviews from './Reviews';
import Notes from './Notes';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { UserContext } from '../../../context/user';
import Recommendations from './Recommendations';

let stompClient: any = null;

interface ISingleStudySetProps {
  studySetId: number;
}

const SingleStudySet = ({ studySetId }: ISingleStudySetProps) => {
  const params = useParams();
  const { user } = useContext(UserContext) as IUserContext;
  const location = useLocation();

  const [studySetCards, setStudySetCards] = useState<IStudySetCardFull[]>([]);
  const [filteredStudySetCards, setFilteredStudySetCards] = useState<IStudySetCardFull[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Original');

  useEffect(() => {
    setFilteredStudySetCards(studySetCards);
  }, [studySetCards.length]);

  const getStudySetCards = () => {
    Client.getStudySetCards(params.studySetId as string)
      .then((res) => {
        const { data } = res.data;
        setStudySetCards(data);
        setFilteredStudySetCards(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const connect = () => {
    let Sock = new SockJS('https://api-meliorem-731d447a39bf.herokuapp.com/wss');
    stompClient = over(Sock);
    if (!stompClient.connected) {
      stompClient.connect({}, onConnected, onError);
    }
  };

  useEffect(() => {
    if (user.id !== 0) {
      connect();
    } else {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    }
  }, [user.id]);

  const sendNotification = (userId: number, text: string, notificationType: string) => {
    if (stompClient) {
      stompClient.send('/api/v1/private-notifications', {}, JSON.stringify({ userId, text, notificationType }));
    }
  };

  const onConnected = () => {
    sendNotification(user.id, "You've added another day onto your streak!", 'STREAK');
  };
  const onError = () => {};

  const createStreak = () => {
    Client.createStreak(studySetId)
      .then(() => {})
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    createStreak();
    getStudySetCards();
  }, [params.studySetId]);

  const updateField = <T,>(value: T, prop: string, id: number | string) => {
    const cards = filteredStudySetCards.map((studySetCard) => {
      if (studySetCard.id === id) {
        return { ...studySetCard, [prop]: value };
      }
      return { ...studySetCard };
    });
    setFilteredStudySetCards(cards);
  };

  const handleMenuItemClick = (clickedMenuItem: string) => {
    setSelectedMenuItem(clickedMenuItem);
    let updatedStudySetCards: IStudySetCardFull[] = [];
    switch (clickedMenuItem) {
      case 'Sort':
        const sortedCards = [...studySetCards];
        updatedStudySetCards = sortedCards.sort(() => Math.random() - 0.5);
        break;
      case 'Alphabetical':
        const alphabeticalStudySetCards = [...studySetCards];
        updatedStudySetCards = alphabeticalStudySetCards.sort((a, b) => a.term.localeCompare(b.term));
        break;
      case 'Original':
        const originalStudySetCards = [...studySetCards];
        updatedStudySetCards = originalStudySetCards.sort((a, b) => (a.id as number) - (b.id as number));
        break;
      case 'Starred':
        updatedStudySetCards = [...filteredStudySetCards].filter((studySetCard) => studySetCard.starred);
        break;
    }
    setFilteredStudySetCards(updatedStudySetCards);
  };

  return (
    <Box>
      <Box mx="auto" as="section" w="100%" maxW={['95%', '95%', '768px']}>
        <Box my="2rem">
          <Reviews studySetId={studySetId} studySetTitle={location.state.title} />
        </Box>
        <Box my="2rem">
          <FlashCards handleMenuItemClick={handleMenuItemClick} studySetCards={filteredStudySetCards} />
        </Box>
        <Box my="2rem">
          <Recommendations />
        </Box>
        <Box my="2rem">
          <Main studySetId={studySetId} />
        </Box>
        <Box my="2rem">
          <StillLearning
            filteredStudySetCards={filteredStudySetCards}
            updateField={updateField}
            studySetCards={studySetCards}
            studySetId={studySetId}
            handleMenuItemClick={handleMenuItemClick}
            selectedMenuItem={selectedMenuItem}
          />
        </Box>
        <Box my="2rem">
          <Notes studySetId={studySetId} />
        </Box>
      </Box>
    </Box>
  );
};

export default SingleStudySet;
