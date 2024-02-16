import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { IInvite } from '../../../interfaces';

//@ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface IInviteProps {
  data: IInvite;
  joinGroup: (groupMemberId: number, isAccepted: boolean, groupId: number) => void;
}

const Invite = ({ data, joinGroup }: IInviteProps) => {
  const handleOnClick = () => {
    const isAccepted = true;
    joinGroup(data.groupMemberId, isAccepted, data.groupId);
  };

  return (
    <Box width="31%" m="0.5rem" p="0.5rem" bg="form.primary" borderRadius={8} boxShadow="md" color="#fff">
      <Box width="100%">
        <Text>{data.fullName}</Text>
        <Text fontSize="0.85rem" fontStyle="italic" color="gray.400">
          {dayjs().to(dayjs(data.createdAt))}
        </Text>
        <Text>has invited you to join the group</Text>
        <Text textAlign="center" my="0.25rem" color="primary.dark" fontWeight="bold">
          {data.groupName}
        </Text>
      </Box>
      <Flex justify="flex-end">
        <Button onClick={handleOnClick} colorScheme="purple">
          Join
        </Button>
      </Flex>
    </Box>
  );
};
export default Invite;
