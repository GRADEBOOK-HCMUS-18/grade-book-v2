import { useLocation, useRouteMatch } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import logo from 'assets/images/logo.png';
import { useQuery, useResponsive } from 'shared/hooks';
import { LineLoading } from 'shared/components';
import { lineLoadingViewModel } from 'shared/view-models';
import {
  Title,
  PopOverProfile,
  TabItem,
  ResponsiveTab,
  CreateClassButton,
} from './components';
import './style/index.css';
import { Fragment } from 'react';

interface IProps {
  toggleSideBar: () => void;
}
export const NavBar = ({ toggleSideBar }: IProps) => {
  const location = useLocation();
  const match = useRouteMatch({ path: '/class/:id' });
  const query = useQuery();

  const inviteId = query.get('invite');
  const isResetPasswordPage: boolean = location.pathname === '/reset';

  const { isMobile, isBigScreen } = useResponsive();

  return (
    <div className="nav-bar">
      {isResetPasswordPage ? (
        <div className="nav-bar-left-item">
          <Link to="/login">
            <img
              src={logo}
              style={{ width: '40px', height: '40px' }}
              alt=""
              className="banner-image"
            ></img>
            <span className="nav-bar-brand-name mx-3 text-align-center">
              Grade book
            </span>
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="nav-bar-left-item">
            <GiHamburgerMenu size={20} onClick={toggleSideBar} />
            <Title pathName={location.pathname} />
            {match && isBigScreen && !inviteId && <ResponsiveTab />}
          </div>
          {match && !isBigScreen && !inviteId && <TabItem />}
          <div className="nav-bar-left-right">
            {location.pathname === '/' && <CreateClassButton />}
            <IoMdNotificationsOutline
              style={{ margin: '0px 20px' }}
              size={30}
            />
            {!isMobile && <PopOverProfile />}
          </div>
        </Fragment>
      )}
      <Observer>
        {() => {
          const loading = lineLoadingViewModel.isLoading;
          return <LineLoading isLoading={loading} />;
        }}
      </Observer>
    </div>
  );
};
