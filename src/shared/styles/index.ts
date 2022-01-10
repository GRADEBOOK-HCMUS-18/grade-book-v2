import { CSSProperties } from 'react';
export const centerHorizontal: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

export const centerVertical: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export const responsiveType = {
  mobile: '(max-width: 600px)',
  tablet: '(max-width: 768px)',
  bigScreen: '(max-width: 1000px)',
};
