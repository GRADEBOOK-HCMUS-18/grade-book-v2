import { useMediaQuery } from 'react-responsive';
import { responsiveType } from 'shared/styles';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: responsiveType.mobile });
  return { isMobile };
};
