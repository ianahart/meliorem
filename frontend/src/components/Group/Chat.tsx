import { Box, Button, Flex, Heading, Text, Textarea } from '@chakra-ui/react';

import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../context/user';
import { IChatMessage, IUserContext } from '../../interfaces';
import { useLocation } from 'react-router-dom';
import { Client } from '../../util/client';
import UserAvatar from '../Shared/UserAvatar';

// @ts-ignore
import dayjs from 'dayjs';

let stompClient: any = null;

const Chat = () => {
  const location = useLocation();
  const groupId = location.state.groupId;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const shouldRun = useRef(true);
  const { user } = useContext(UserContext) as IUserContext;
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [error, setError] = useState('');

  const connect = () => {
    let Sock = new SockJS('https://api-meliorem-731d447a39bf.herokuapp.com/wss');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const getGroupMessages = () => {
    Client.getGroupMessages(groupId)
      .then((res) => {
        const { data } = res.data;

        setChatMessages(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(true);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages.length]);

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      getGroupMessages();
      connect();
    }
  }, [shouldRun.current, connect, user.id]);

  const onConnected = () => {
    stompClient.subscribe(`/user/${user.id}/group`, onChatMessage);
  };
  const onError = () => {};

  const onChatMessage = (payload: any) => {
    const groupMessage = JSON.parse(payload.body);

    if (groupMessage.groupId === groupId) {
      setChatMessages((prevState) => [JSON.parse(payload.body), ...prevState]);
    }
  };

  const sendChatMessage = (groupId: number, userId: number) => {
    if (stompClient && user.id !== 0 && messageText.trim().length > 0) {
      stompClient.send('/api/v1/chat-group', {}, JSON.stringify({ groupId, userId: userId, message: messageText }));
      setMessageText('');
    }
  };

  const handleOnSendChatMessage = () => {
    setError('');
    if (messageText.length > 200) {
      setError('Message cannot exceed 200 characters.');
      return;
    }
    sendChatMessage(groupId, user.id);
  };

  return (
    <Box m="2rem">
      <Box p="2rem" bg="bg.dark" borderRadius={2}>
        <Box bg="bg.primary" p="0.5rem" borderRadius={2} w="100%" mx="auto">
          <Flex flexDir="column" justify="space-between">
            <Box>
              <Heading color="#fff" fontSize="1.8rem">
                Group chat
              </Heading>
              <Box my="2rem" className="overflow-scroll" height="600px" overflowY="auto">
                <Flex flexDir="column-reverse">
                  {chatMessages.map((chatMessage) => {
                    return (
                      <Box my="2rem" key={chatMessage.id}>
                        <Flex color="#fff" align="center">
                          <UserAvatar
                            height="35px"
                            width="35px"
                            fontSize="1.6rem"
                            avatarUrl={chatMessage.avatarUrl}
                            fullName={chatMessage.fullName}
                          />
                          <Box ml="0.5rem">
                            {user.id === chatMessage.userId && <Text color="gray.400">(you)</Text>}
                            <Text fontWeight="bold">{chatMessage.fullName}</Text>
                          </Box>
                        </Flex>
                        <Box p="1rem" mt="0.25rem" bg="bg.dark" width="70%" borderRadius={20}>
                          <Text color="#fff">{chatMessage.message}</Text>
                          <Flex justify="flex-end" my="0.25rem">
                            <Text fontStyle="italic" color="gray.400">
                              {dayjs(chatMessage.createdAt).format('MM/DD/YYYY hh:mma')}
                            </Text>
                          </Flex>
                        </Box>
                      </Box>
                    );
                  })}
                </Flex>
                {error.length > 0 && (
                  <Flex>
                    <Text color="#fff">{error}</Text>
                  </Flex>
                )}
                <Box ref={messagesEndRef}></Box>
              </Box>
            </Box>
            <Flex mb="auto">
              <Textarea
                onChange={(e) => setMessageText(e.target.value)}
                value={messageText}
                w="80%"
                placeholder="What do you want to say?"
                color="#fff"
                resize="none"
                border="none"
              ></Textarea>
              <Flex ml="auto" flexDir="column" justifySelf="right" alignSelf="flex-end">
                <Button onClick={handleOnSendChatMessage} colorScheme="purple">
                  Send
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
