import { Box, Flex } from '@chakra-ui/react';

import { IRecommendation, IStudySet } from '../../interfaces';
import StudySet from './StudySet';

type Data = IStudySet[] | IRecommendation[];

interface IStudySetsProps {
  data: Data;
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
