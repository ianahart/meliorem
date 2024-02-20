import { Box } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom';
import GroupMembers from './GroupMembers';
import Invites from './Invites';
import GroupStudySets from './GroupStudySets';
import LeaveGroup from './LeaveGroup';

const Sidebar = () => {
  const groupName = useParams().groupName as string;
  const location = useLocation();
  const groupId = location.state.groupId;
  const adminId = location.state.adminId;

  return (
    <Box p="0.5rem" my="2rem" minH="800px" borderRight="1px solid">
      <Box my="4rem">
        <GroupMembers adminId={adminId} groupName={groupName} groupId={groupId} />
      </Box>
      <Box my="4rem">
        <Invites groupId={groupId} adminId={adminId} />
      </Box>
      <Box my="4rem">
        <GroupStudySets groupId={groupId} adminId={adminId} />
      </Box>
      <Box my="4rem">
        <LeaveGroup groupId={groupId} adminId={adminId} />
      </Box>
    </Box>
  );
};

export default Sidebar;
