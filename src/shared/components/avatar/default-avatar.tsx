import { CSSProperties } from 'react';
import { baseColors } from 'assets/color';
import { centerHorizontal } from 'shared/styles';
import { User } from 'shared/models';

interface IProps {
  user: User;
  size: number;
  onClick?: (event: any) => void;
}

export const DefaultAvatar = ({ user, size, onClick }: IProps) => {
  const { firstName, defaultProfilePictureHex } = user;

  const color = defaultProfilePictureHex;

  const style: CSSProperties = {
    ...centerHorizontal,
    backgroundColor: color,
    width: size,
    height: size,
    borderRadius: size,
    justifyContent: 'center',
    color: baseColors.white,
    cursor: 'pointer',
  };
  return (
    <div onClick={onClick} style={style}>
      <span>{firstName[0]}</span>
    </div>
  );
};
