import { CSSProperties } from 'react';
import { baseColors } from 'assets/color';
import avatarColors from 'assets/color/avatar-color.json';
import { userViewModel } from 'shared/view-models';
import { centerHorizontal } from 'shared/styles';

interface IProps {
  username: string;
  avatarColor: string | null;
  size: number;
}

const getRandomColor = (): string => {
  const random = Math.floor(Math.random() * 11);
  return avatarColors[random].hex;
};

export const DefaultAvatar = ({ username, avatarColor, size }: IProps) => {
  let color;
  if (avatarColor) {
    color = avatarColor;
  } else {
    color = getRandomColor();
    userViewModel.setAvatarColor(color);
  }
  const style: CSSProperties = {
    ...centerHorizontal,
    backgroundColor: color,
    width: size,
    height: size,
    borderRadius: size,
    justifyContent: 'center',
    color: baseColors.white,
  };
  return (
    <div style={style}>
      <span>{username[0]}</span>
    </div>
  );
};
