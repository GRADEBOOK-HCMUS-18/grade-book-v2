import { baseColors } from 'assets/color';
import { CSSProperties } from 'react';
import { User } from 'shared/models';
import { DefaultAvatar } from './default-avatar';
import { UnknownAvatar } from './unknow-avatar';

interface IProps {
  user?: User;
  onClick?: (event: any) => void;
  size?: number;
}

export const Avatar = ({ user, size, onClick }: IProps) => {
  const avatarSize = size ? size : 32;
  const avatarStyle: CSSProperties = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize,
    cursor: 'pointer',
    border: `1px solid ${baseColors.lightGray}`,
  };

  const handleClick = (event: any) => {
    if (onClick) {
      onClick(event);
    }
  };

  if (user === undefined) {
    return <UnknownAvatar size={avatarSize} />;
  }

  if (user?.profilePictureUrl === '')
    return (
      <DefaultAvatar onClick={handleClick} size={avatarSize} user={user} />
    );
  else
    return (
      <img
        onClick={handleClick}
        style={avatarStyle}
        alt=""
        src={user?.profilePictureUrl}
      />
    );
};
