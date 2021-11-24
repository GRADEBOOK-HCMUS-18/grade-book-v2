import { observer } from 'mobx-react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Avatar } from 'shared/components';
import { userViewModel } from 'shared/view-models';
import './style/index.css';

export const PopOverProfile = observer(() => {
  const history = useHistory();

  const gotoProfile = () => {
    history.push('/profile');
  };

  const logOut = () => {
    history.push('/login');
    userViewModel.logout();
  };

  const user = userViewModel.user;
  return (
    <OverlayTrigger
      trigger="focus"
      placement="bottom"
      overlay={
        <Popover id="pop">
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
      }
    >
      <button className="flex-btn">
        <Avatar user={user} size={35} />
      </button>
    </OverlayTrigger>
  );
});
