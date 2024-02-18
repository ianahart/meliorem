import { Box } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom';
import GroupMembers from './GroupMembers';
import Invites from './Invites';
import GroupStudySets from './GroupStudySets';

const Sidebar = () => {
  const groupName = useParams().groupName as string;
  const location = useLocation();

  return (
    <Box p="0.5rem" my="2rem" minH="800px" borderRight="1px solid" borderColor="gray.700">
      <Box my="4rem">
        <GroupMembers groupName={groupName} groupId={location.state.groupId} />
      </Box>
      <Box my="4rem">
        <Invites groupId={location.state.groupId} adminId={location.state.adminId} />
      </Box>
      <Box my="4rem">
        <GroupStudySets groupId={location.state.groupId} adminId={location.state.adminId} />
      </Box>
    </Box>
  );
};

export default Sidebar;
