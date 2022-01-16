import { baseColors } from 'assets/color';
import { CSSProperties } from 'react';
import { centerHorizontal } from 'shared/styles';

interface IProps {
  size: number;
  onClick?: (event: any) => void;
}

export const UnknownAvatar = ({ size }: IProps) => {
  const style: CSSProperties = {
    ...centerHorizontal,
    backgroundColor: '#2d2e30',
    width: size,
    height: size,
    borderRadius: size,
    justifyContent: 'center',
    color: baseColors.white,
    cursor: 'pointer',
  };
  return (
    <div style={style}>
      <span>?</span>
    </div>
  );
};
