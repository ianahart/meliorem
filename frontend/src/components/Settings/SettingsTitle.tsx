import { Flex } from '@chakra-ui/react';

export interface ISettingsTitle {
  children: React.ReactNode;
}

const SettingsTitle = ({ children }: ISettingsTitle) => {
  return (
    <Flex
      p="2rem"
      flexDir={['row', 'row', 'column']}
      align="center"
      alignSelf={['center', 'center', 'flex-start']}
    >
      {children}
    </Flex>
  );
};

export default SettingsTitle;
