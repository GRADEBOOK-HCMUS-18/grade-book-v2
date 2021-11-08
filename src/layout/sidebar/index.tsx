import { useState } from 'react';
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import { Link } from 'react-router-dom';
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

  return (
    <Offcanvas show={show} onHide={toggle}>
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
