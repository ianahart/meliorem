import { Flex } from '@chakra-ui/react';
import { IStudySet, IUserContext } from '../../../../interfaces';
import { useContext } from 'react';
import { UserContext } from '../../../../context/user';
import StudySetShareOption from './StudySetShareOption';
import StudySetEditOption from './StudySetEditOption';
import StudySetMiscOption from './StudySetMiscOption';

export interface IStudySetOptionsProps {
  studySet: IStudySet;
}

const StudySetOptions = ({ studySet }: IStudySetOptionsProps) => {
  const { user } = useContext(UserContext) as IUserContext;

  return (
    <Flex align="center" justify="space-around">
      <StudySetShareOption />
      {user.id === studySet.userId && <StudySetEditOption studySetId={studySet.id} />}
      <StudySetMiscOption studySet={studySet} />
    </Flex>
  );
};

export default StudySetOptions;