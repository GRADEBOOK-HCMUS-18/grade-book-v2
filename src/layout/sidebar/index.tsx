import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar } from 'shared/components';
import { useResponsive } from 'shared/hooks';
import { userViewModel } from 'shared/view-models';
import { SideBarItems } from './components';
import { PathDisplay } from './components/side-bar-item';
import './style/index.css';

interface IProps {
  show: boolean;
  toggle: () => void;
}

export const SideBar = ({ show, toggle }: IProps) => {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleSelectItem = (id: number) => {
    setSelectedItem(id);
    toggle();
  };

  const history = useHistory();
  const location = useLocation();
  const { isMobile } = useResponsive();
  const user = userViewModel.user;

  useEffect(() => {
    const path: any = location.pathname;
    if (!PathDisplay.includes(path)) {
      setSelectedItem(-1);
    }
  }, [location]);

  return (
    <Offcanvas show={show} onHide={toggle}>
      {isMobile && (
        <Link to="/profile" onClick={toggle}>
          <div
            className={
              selectedItem === -1 ? 'avatar-item-selected' : 'avatar-item'
            }
          >
            <Avatar size={50} user={user} />
            <div className="user-info">
              <span>{user.email}</span>
              <span>{user.displayName}</span>
            </div>
          </div>
        </Link>
      )}
      {SideBarItems.map((item) => {
        let name =
          item.id === selectedItem ? 'sidebar-item-selected' : 'sidebar-item';

        return (
          <Link key={item.id} to={item.path}>
            <div className={name} onClick={() => handleSelectItem(item.id)}>
              {item.icon}
              <span className="item-content">{item.content}</span>
            </div>
          </Link>
        );
      })}

      {isMobile && (
        <div
          onClick={() => {
            userViewModel.logout();
            history.push('/logout');
          }}
          className="sidebar-item"
        >
          <AiOutlineLogout size={18} />
          <span className="item-content">Đăng xuất</span>
        </div>
      )}
    </Offcanvas>
  );
};
