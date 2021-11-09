import { useMediaQuery } from 'react-responsive';
import { responsiveType } from 'shared/styles';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: responsiveType.mobile });
  const isTablet = useMediaQuery({ query: responsiveType.tablet });
  return { isMobile, isTablet };
};
