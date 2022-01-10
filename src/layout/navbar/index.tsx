import { useLocation, useRouteMatch } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiMessengerLine } from 'react-icons/ri';
import { useQuery, useResponsive } from 'shared/hooks';
import { LineLoading } from 'shared/components';
import { lineLoadingViewModel } from 'shared/view-models';
import {
  Title,
  PopOverProfile,
  TabItem,
  ResponsiveTab,
  CreateClassButton,
  PopOverUserNotifications,
} from './components';
import './style/index.css';

interface IProps {
  toggleSideBar: () => void;
}
export const NavBar = ({ toggleSideBar }: IProps) => {
  const location = useLocation();
  const match = useRouteMatch({ path: '/class/:id' });
  const query = useQuery();
  const inviteId = query.get('invite');

  const { isMobile, isBigScreen } = useResponsive();

  return (
    <div className="nav-bar">
      <div className="nav-bar-left-item">
        <GiHamburgerMenu size={20} onClick={toggleSideBar} />
        <Title pathName={location.pathname} />
        {match && isBigScreen && !inviteId && <ResponsiveTab />}
      </div>
      {match && !isBigScreen && !inviteId && <TabItem />}
      <div className="nav-bar-left-right">
        {location.pathname === '/' && <CreateClassButton />}
        <RiMessengerLine size={28} />
        <PopOverUserNotifications></PopOverUserNotifications>
        {!isMobile && <PopOverProfile />}
      </div>
      <Observer>
        {() => {
          const loading = lineLoadingViewModel.isLoading;
          return <LineLoading isLoading={loading} />;
        }}
      </Observer>
    </div>
  );
};
