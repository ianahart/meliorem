import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { Box, Tooltip } from '@chakra-ui/react';
import { Client } from '../../../../util/client';
import { IStudySet } from '../../../../interfaces';

export interface IStudySetBookmarkOptionProps {
  studySet: IStudySet;
  handleOnBookMark: (isBookMarked: boolean, id: number) => void;
}

const StudySetBookmarkOption = ({ studySet, handleOnBookMark }: IStudySetBookmarkOptionProps) => {
  const createBookMark = () => {
    Client.createBookMark(studySet.id)
      .then((res) => {
        const { bookMark } = res.data;
        handleOnBookMark(bookMark.isBookMarked, bookMark.id);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const deleteBookMark = () => {
    Client.deleteBookMark(studySet.bookMark?.id)
      .then(() => {})
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleOnClick = () => {
    if (!studySet.bookMark?.isBookMarked) {
      createBookMark();
    } else {
      handleOnBookMark(!studySet.bookMark?.isBookMarked, studySet.bookMark?.id);

      deleteBookMark();
    }
  };

  return (
    <Tooltip label={studySet.bookMark?.isBookMarked ? 'Un bookmark' : 'Bookmark'}>
      <Box
        onClick={handleOnClick}
        color={studySet.bookMark?.isBookMarked ? 'gold' : '#fff'}
        cursor="pointer"
        mr="0.25rem"
        fontSize="1.8rem"
      >
        {studySet.bookMark?.isBookMarked ? <BsBookmarkFill /> : <BsBookmark />}
      </Box>
    </Tooltip>
  );
};

export default StudySetBookmarkOption;
