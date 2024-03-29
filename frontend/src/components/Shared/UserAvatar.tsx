import { Flex } from '@chakra-ui/react';
import { abbreviate } from '../../util';

interface IUserAvatarProps {
  avatarUrl: string | null;
  fullName: string;
  width: string;
  height: string;
  fontSize: string;
}

const UserAvatar = ({
  avatarUrl,
  fullName,
  width,
  height,
  fontSize,
}: IUserAvatarProps) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height={height}
      width={width}
      color="light.primary"
      fontSize={fontSize}
      borderRadius="50%"
      bg='primary.dark'
      backgroundImage={avatarUrl ? `url(${avatarUrl})` : 'none'}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      {!avatarUrl ? abbreviate(fullName) : ''}
    </Flex>
  );
};

export default UserAvatar;
