import { matchPath, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CSSProperties } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlinePlus } from 'react-icons/ai';
import { baseColors } from 'assets/color';
import { Avatar } from 'shared/components';
import { userViewModel } from 'shared/view-models';
import { centerHorizontal } from 'shared/styles';
import { useResponsive } from 'shared/hooks';
import { ClassTab, Title } from './components';
interface IProps {
  toggleSideBar: () => void;
}
export const NavBar = ({ toggleSideBar }: IProps) => {
  const { rightItem, leftItem, navStyle } = useStyles();
  const location = useLocation();

  const isInClass: any = matchPath(location.pathname, {
    path: '/class/:id',
    strict: false,
  });

  const { isMobile } = useResponsive();

  return (
    <div style={navStyle}>
      <div style={leftItem}>
        <GiHamburgerMenu size={20} onClick={toggleSideBar} />
        <Title pathName={location.pathname} />
      </div>
      {isInClass && <ClassTab />}
      {!isMobile && (
        <div style={rightItem}>
          {location.pathname === '/class' && (
            <AiOutlinePlus style={{ marginRight: 10 }} size={30} />
          )}
          {<Avatar user={userViewModel.getUser()} />}
        </div>
      )}
    </div>
  );
};

const useStyles = () => {
  const navStyle: CSSProperties = {
    ...centerHorizontal,
    borderBottom: `0.0625rem solid ${baseColors.lightGray}`,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  };

  const rightItem: CSSProperties = {
    ...centerHorizontal,
    justifyContent: 'space-between',
    padding: 20,
  };
  const leftItem: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  };

  return { navStyle, rightItem, leftItem };
};
