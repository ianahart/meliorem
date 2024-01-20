import { Flex } from '@chakra-ui/react';

export interface ISettingsContainerProps {
  children: React.ReactNode;
}

const SettingsContainer = ({ children }: ISettingsContainerProps) => {
  return (
    <Flex flexDir={['column', 'column', 'row']} as="section" justify="space-between">
      {children}
    </Flex>
  );
};

export default SettingsContainer;
