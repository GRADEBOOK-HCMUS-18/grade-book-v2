import { useLocation, useRouteMatch } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useQuery, useResponsive } from 'shared/hooks';
import { LineLoading } from 'shared/components';
import { lineLoadingViewModel, userViewModel } from 'shared/view-models';
import {
  Title,
  PopOverProfile,
  TabItem,
  ResponsiveTab,
  CreateClassButton,
  ConfirmEmailBtn,
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
  const user = userViewModel.user;

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
        {user.isEmailConfirmed === false ? <ConfirmEmailBtn /> : <></>}
        {user.isEmailConfirmed && location.pathname === '/' && (
          <CreateClassButton />
        )}
        <IoMdNotificationsOutline style={{ margin: '0px 20px' }} size={30} />
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
