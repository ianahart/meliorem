import { Box, Flex } from '@chakra-ui/react';

import { IStudySet } from '../../interfaces';
import StudySet from './StudySet';

interface IStudySetsProps {
  data: IStudySet[];
  isBookMarked?: boolean;
}

const StudySets = ({ data, isBookMarked = false }: IStudySetsProps) => {
  return (
    <Box as="section">
      <Flex flexDir="row">
        {data.map((item) => {
          return <StudySet isBookMarked={isBookMarked} key={item.id} data={item} />;
        })}
      </Flex>
    </Box>
  );
};

export default StudySets;
