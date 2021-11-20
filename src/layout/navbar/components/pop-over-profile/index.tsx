import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Avatar } from 'shared/components';
import { userViewModel } from 'shared/view-models';
import './style/index.css';

export const PopOverProfile = observer(() => {
  const [show, setShow] = useState(false);

  const [target, setTarget] = useState(null);

  const history = useHistory();

  const ref = useRef(null);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  const gotoProfile = () => {
    setShow(!show);
    history.push('/profile');
  };

  const logOut = () => {
    history.push('/login');
    userViewModel.logout();
  };

  const user = userViewModel.user;
  return (
    <div ref={ref}>
      <Avatar onClick={handleClick} user={user} />
      <Overlay show={show} target={target} placement="bottom" container={ref}>
        <Popover id="popover-contained">
          <Popover.Body>
            <div className="center-vertical">
              <Avatar size={80} user={user} />
              <strong>{user.email}</strong>
              <p>{user.displayName}</p>
            </div>
            <div className="center-vertical button-container">
              <div
                className="center-horizontal action-button"
                onClick={gotoProfile}
              >
                <span className="button-content">
                  Quản lý tài khoản của bạn
                </span>
              </div>
              <div className="center-horizontal action-button" onClick={logOut}>
                <AiOutlineLogout size={18} />
                <span style={{ marginLeft: 8 }} className=" button-content">
                  Đăng xuất
                </span>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
});
