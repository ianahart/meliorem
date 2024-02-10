import { Flex } from '@chakra-ui/react';
import { IStudySet, IUserContext } from '../../../../interfaces';
import { useContext } from 'react';
import { UserContext } from '../../../../context/user';
import StudySetShareOption from './StudySetShareOption';
import StudySetEditOption from './StudySetEditOption';
import StudySetMiscOption from './StudySetMiscOption';
import StudySetBookmarkOption from './StudySetBookmarkOption';

export interface IStudySetOptionsProps {
  studySet: IStudySet;
  handleOnBookMark: (isBookMarked: boolean, id: number) => void;
}

const StudySetOptions = ({ studySet, handleOnBookMark }: IStudySetOptionsProps) => {
  const { user } = useContext(UserContext) as IUserContext;

  return (
    <Flex align="center" justify="space-around">
      <StudySetBookmarkOption studySet={studySet} handleOnBookMark={handleOnBookMark} />
      <StudySetShareOption />
      {user.id === studySet.userId && <StudySetEditOption studySetId={studySet.id} />}
      <StudySetMiscOption studySet={studySet} />
    </Flex>
  );
};

export default StudySetOptions;
