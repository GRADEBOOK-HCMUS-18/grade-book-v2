import { useState } from 'react';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import { Link } from 'react-router-dom';
import { Avatar } from 'shared/components';
import { useResponsive } from 'shared/hooks';
import { userViewModel } from 'shared/view-models';
import { SideBarItems } from './components';
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

  const { isMobile } = useResponsive();
  const user = userViewModel.getUser();

  return (
    <Offcanvas show={show} onHide={toggle}>
      {isMobile && (
        <div className="avatar-item">
          <Avatar size={50} user={user} />
          <div className="user-info">
            <span>{user.email}</span>
            <span>{user.displayName}</span>
          </div>
        </div>
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
    </Offcanvas>
  );
};
