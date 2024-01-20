import { Box } from '@chakra-ui/react';

export interface ISettingsContentProps {
  children: React.ReactNode;
}

const SettingsContent = ({ children }: ISettingsContentProps) => {
  return (
    <Box
      p="1.5rem"
      borderRadius={8}
      width={['95%', '95%', '80%']}
      mx="auto"
      minH="400px"
      bg="form.primary"
    >
      {children}
    </Box>
  );
};

export default SettingsContent;
