import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { IInvitee } from '../../../interfaces';
import UserAvatar from '../../Shared/UserAvatar';

//@ts-ignore
import dayjs from 'dayjs';

export interface IInviteeProps {
  data: IInvitee;
}

const Invitee = ({ data }: IInviteeProps) => {
  console.log(data);
  return (
    <Flex minW="180px" justify="space-between" flexDir="column" m="1rem" borderRadius={8} bg="form.primary" p="0.5rem">
      <Box>
        <Flex align="center">
          <UserAvatar
            fontSize="1.2rem"
            avatarUrl={data.avatarUrl}
            fullName={data.fullName}
            height="30px"
            width="30px"
          />
          <Box ml="0.5rem" color="#fff">
            <Heading fontSize="1rem" as="h4">
              {data.fullName}
            </Heading>
            <Text>{data.schoolName}</Text>
          </Box>
        </Flex>
        <Box my="0.5rem" color="gray.400">
          <Text>Joined {dayjs(data.createdAt).format('MMM YYYY')}</Text>
        </Box>
        <Flex>
          <Text color="#fff">{data.firstName} is studying</Text>
        </Flex>
        <Flex flexWrap="wrap">
          {data.topics.map((topic, index) => {
            return (
              <Text mx="0.25rem" color="#fff" key={topic.id}>
                {topic.name}
                {data.topics.length - 1 === index ? '' : ','}
              </Text>
            );
          })}
        </Flex>
      </Box>
      <Flex my="1.5rem">
        <Button colorScheme="purple" width="100%">
          Invite
        </Button>
      </Flex>
    </Flex>
  );
};

export default Invitee;
