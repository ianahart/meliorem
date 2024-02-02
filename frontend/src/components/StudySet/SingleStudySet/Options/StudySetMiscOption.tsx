import { Flex, Box, Text } from '@chakra-ui/react';
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import ClickAwayMenu from '../../../Shared/ClickAwayMenu';
import { useContext, useRef, useState } from 'react';
import { Client } from '../../../../util/client';
import { useNavigate } from 'react-router-dom';
import { IStudySet, IUserContext } from '../../../../interfaces';
import { UserContext } from '../../../../context/user';

interface IStudySetMiscOptionProps {
  studySet: IStudySet;
}

const StudySetMiscOption = ({ studySet }: IStudySetMiscOptionProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = (open: boolean) => setMenuOpen(open);

  const deleteStudySet = () => {
    Client.deleteStudySet(studySet.id)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <Flex
      ref={triggerRef}
      onClick={() => handleMenuOpen(true)}
      position="relative"
      minW="30px"
      flexDir="column"
      justify="center"
      mx="0.5rem"
      cursor="pointer"
      align="center"
      border="1px solid #fff"
      p="0.25rem"
      borderRadius={2}
    >
      <Box fontSize="1.4rem">
        <BsThreeDots />
      </Box>

      {menuOpen && (
        <ClickAwayMenu
          handleMenuOpen={handleMenuOpen}
          triggerRef={triggerRef}
          menuRef={menuRef}
          top={['45px', '45px', '45px']}
          left={['unset', 'unset', 'unset']}
          right={['0px', '0px', '0px']}
          bottom={['unset', 'unset', 'unset']}
          backgroundColor="bg.primary"
          width="150px"
          height="120px"
        >
          <Box p="0.5rem">
            {user.id === studySet.userId && (
              <Flex onClick={deleteStudySet} p="0.25rem" _hover={{ backgroundColor: 'gray.700' }} align="center">
                <Box mr="0.5rem">
                  <BsTrash />
                </Box>
                <Text>Delete</Text>
              </Flex>
            )}
          </Box>
        </ClickAwayMenu>
      )}
    </Flex>
  );
};

export default StudySetMiscOption;
