import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  UnorderedList,
  ListItem,
  Tooltip,
} from '@chakra-ui/react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useContext, useRef, useEffect, useState } from 'react';
import { UserContext } from '../../context/user';
import { INotification, IUserContext } from '../../interfaces';
import { Client } from '../../util/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AiOutlineMinusCircle } from 'react-icons/ai';

dayjs.extend(relativeTime);

let stompClient: any = null;

const Notification = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const initialFocusRef = useRef(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const shouldRun = useRef(true);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 20,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const connect = () => {
    let Sock = new SockJS('https://api-meliorem-731d447a39bf.herokuapp.com/wss');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onNotification = (payload: any) => {
    setNotifications((prevState) => [...prevState, JSON.parse(payload.body)]);
    setPagination((prevState) => ({
      ...prevState,
      totalElements: prevState.totalElements + 1,
    }));
  };

  useEffect(() => {
    if (user.id !== 0) {
    } else {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    }
  }, [user.id]);

  const onConnected = () => {
    stompClient.subscribe(`/user/${user.id}/notifications`, onNotification);
  };
  const onError = () => {};

  const getNotifications = (paginate: boolean, userId: number) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getNotifications(userId, pageNum, pagination.pageSize, pagination.direction)
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

        setNotifications(items);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (shouldRun.current && user.id !== 0) {
      shouldRun.current = false;
      connect();
      getNotifications(false, user.id);
    }
  }, [shouldRun.current, connect, user.id]);

  const removeNotification = (notificationId: number) => {
    Client.removeNotification(notificationId)
      .then(() => {
        setNotifications((prevState) => prevState.filter((notification) => notification.id !== notificationId));
        setPagination((prevState) => ({ ...prevState, totalElements: prevState.totalElements - 1 }));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <>
      <Popover initialFocusRef={initialFocusRef} placement="bottom" closeOnBlur={false}>
        <PopoverTrigger>
          <Box position="relative" color="#fff" fontSize="3rem">
            <IoMdNotificationsOutline />
            {pagination.totalElements > 0 && (
              <Flex
                flexDir="column"
                justify="center"
                align="center"
                fontSize="0.85rem"
                color="#fff"
                fontWeight="bold"
                top="-10px"
                left="-5px"
                pos="absolute"
                borderRadius={4}
                width="20px"
                height="20px"
                bg="red.400"
              >
                {pagination.totalElements > 9 ? '9+' : pagination.totalElements}
              </Flex>
            )}
          </Box>
        </PopoverTrigger>
        <PopoverContent left="-30px" color="white" bg="form.primary" borderColor="blue.800">
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            Your recent notifications
          </PopoverHeader>
          <PopoverArrow bg="form.primary" />
          <PopoverCloseButton />
          <PopoverBody>
            <UnorderedList
              className="overflow-scroll"
              overflowY="auto"
              height="300px"
              display="flex"
              flexDir="column-reverse"
            >
              {notifications.map((notification) => {
                return (
                  <ListItem my="1rem" key={notification.id}>
                    <Flex align="center">
                      <Box>
                        <Text>{notification.text}</Text>
                        <Text color="gray.400" fontSize="0.85rem">
                          {dayjs().to(dayjs(notification.createdAt))}
                        </Text>
                      </Box>
                      <Tooltip label="remove">
                        <Box
                          onClick={() => removeNotification(notification.id)}
                          color="#fff"
                          fontSize="1.2rem"
                          cursor="pointer"
                        >
                          <AiOutlineMinusCircle />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Notification;
