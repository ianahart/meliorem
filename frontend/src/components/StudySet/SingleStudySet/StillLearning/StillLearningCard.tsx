import { Box, Flex, Textarea, Tooltip } from '@chakra-ui/react';
import { IStudySetCardFull } from '../../../../interfaces';
import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import { Client } from '../../../../util/client';
import TextToSpeech from '../TextToSpeech';

export interface IStillLearningCardProps {
  studySetCard: IStudySetCardFull;
  updateField: <T>(value: T, prop: string, id: number | string) => void;
}

const StillLearningCard = ({ studySetCard, updateField }: IStillLearningCardProps) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const editStudySetCard = () => {
    Client.editStudySetCard(studySetCard.term, studySetCard.definition, studySetCard.id)
      .then(() => {})
      .catch((err) => {
        throw new Error(err);
      });
  };

  const toggleEdit = () => {
    if (!isReadOnly) {
      editStudySetCard();
    }
    setIsReadOnly((prevState) => !prevState);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>, prop: string) => {
    updateField(e.target.value, prop, studySetCard.id);
  };

  const handleOnStarredClick = () => {
    Client.studySetCardStarred(!studySetCard.starred, studySetCard.id)
      .then(() => {
        updateField(!studySetCard.starred, 'starred', studySetCard.id);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <Flex bg="form.primary" minH="40px" my="1rem" borderRadius={2} p="0.5rem">
      <Textarea
        readOnly={isReadOnly ? true : false}
        onChange={(e) => handleOnChange(e, 'term')}
        border="none"
        width="50%"
        borderRadius={0}
        borderBottom={isReadOnly ? 'none' : '2px solid #fff'}
        resize="none"
        _focus={{ boxShadow: 'none' }}
        value={studySetCard.term}
      />
      <Flex mx="1rem" flexDir="column" align="center" justify="center">
        <Box w="1px" h="20px" bg="black"></Box>
      </Flex>
      <Textarea
        readOnly={isReadOnly ? true : false}
        onChange={(e) => handleOnChange(e, 'definition')}
        border="none"
        borderRadius={0}
        borderBottom={isReadOnly ? 'none' : '2px solid #fff'}
        resize="none"
        _focus={{ boxShadow: 'none' }}
        value={studySetCard.definition}
      />
      <Flex align="center">
        <Tooltip label={studySetCard.starred ? 'Unstar' : 'Star'}>
          <Box
            color={studySetCard.starred ? 'gold' : '#fff'}
            onClick={handleOnStarredClick}
            fontSize="1.7rem"
            cursor="pointer"
            mx="1rem"
          >
            {studySetCard.starred ? <AiFillStar /> : <AiOutlineStar />}
          </Box>
        </Tooltip>
        <TextToSpeech text={`${studySetCard.term} ${studySetCard.definition}`} />
        <Tooltip label="Edit">
          <Box onClick={toggleEdit} fontSize="1.7rem" cursor="pointer" mx="1rem">
            <FaPen />
          </Box>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
export default StillLearningCard;
