import { CSSProperties } from 'react';
import { User } from 'shared/models';
import { DefaultAvatar } from './default-avatar';

interface IProps {
  user: User;
  size?: number;
}

export const Avatar = ({ user, size }: IProps) => {
  const avatarSize = size ? size : 32;
  const avatarStyle: CSSProperties = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize,
  };

  if (!user.imageUrl)
    return (
      <DefaultAvatar
        size={avatarSize}
        avatarColor={user.avatarColor}
        username={user.username}
      />
    );
  else return <img style={avatarStyle} alt="" src={user.imageUrl} />;
};
