import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useLocation } from 'react-router-dom';
import { responsiveType } from 'shared/styles';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: responsiveType.mobile });
  const isTablet = useMediaQuery({ query: responsiveType.tablet });
  const isBigScreen = useMediaQuery({ query: responsiveType.bigScreen });
  return { isMobile, isTablet, isBigScreen };
};

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export function usePreviousPath() {
  const history: any = useHistory();

  let previousPath = null;
  if (!history.location.state) {
    return { previousPath };
  }

  const { pathname, search }: any = history.location.state.from;

  if (pathname) {
    previousPath = pathname;
  }
  if (search) {
    previousPath += search;
  }

  return { previousPath };
}
