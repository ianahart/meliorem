import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import LeaveGroupModal from './LeaveGroupModal';

export interface ILeaveGroupProps {
  groupId: number;
  adminId: number;
}

const LeaveGroup = ({ groupId, adminId }: ILeaveGroupProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSetIsModalOpen = (open: boolean) => {
    setIsModalOpen(open);
  };

  return (
    <Box m="1rem" p="0.5rem" color="#fff">
      <Flex justify="flex-end">
        <Button onClick={() => setIsModalOpen(true)} colorScheme="purple">
          Leave group
        </Button>
      </Flex>
      {isModalOpen && (
        <LeaveGroupModal groupId={groupId} adminId={adminId} handleSetIsModalOpen={handleSetIsModalOpen} />
      )}
    </Box>
  );
};

export default LeaveGroup;
