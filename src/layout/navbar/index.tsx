import { useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Avatar } from 'shared/components';
import { userViewModel} from 'shared/view-models';
import { useResponsive } from 'shared/hooks';
import { Title,CreateJoinClassDropDownButton } from './components';
import './style/index.css';
interface IProps {
  toggleSideBar: () => void;
}
export const NavBar = ({ toggleSideBar }: IProps) => {
  const location = useLocation();

  const { isMobile } = useResponsive();

  return (
    <div className="nav-bar">
      <div className="nav-bar-left-item">
        <GiHamburgerMenu size={20} onClick={toggleSideBar} />
        <Title pathName={location.pathname} />
      </div>

      <div className="nav-bar-left-right">
        {location.pathname === '/class' && 
          <CreateJoinClassDropDownButton/>
        }
        <IoMdNotificationsOutline style={{ margin: '0px 20px' }} size={30} />
        {!isMobile && <Avatar user={userViewModel.getUser()} />}
      </div>
    </div>
  );
};
