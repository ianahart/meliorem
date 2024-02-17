import { Box } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom';
import GroupMembers from './Members';

const Sidebar = () => {
  const groupName = useParams().groupName as string;
  const location = useLocation();
  console.log(location.state.adminId);

  return (
    <Box p="0.5rem" my="2rem" minH="800px" borderRight="1px solid" borderColor="gray.700">
      <Box my="2rem">
        <GroupMembers groupName={groupName} groupId={location.state.groupId} />
      </Box>
    </Box>
  );
};

export default Sidebar;
