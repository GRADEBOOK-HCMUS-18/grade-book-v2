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
  const { fistName, defaultAvatar } = user;

  const color = defaultAvatar;

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
      <span>{fistName[0]}</span>
    </div>
  );
};
