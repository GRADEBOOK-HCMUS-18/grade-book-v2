import { observer } from 'mobx-react';
import { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Avatar, PopUp } from 'shared/components';
import { userViewModel } from 'shared/view-models';
import './style/index.css';

export const PopOverProfile = observer(() => {
  const [showPopUp, setShowPopUp] = useState(false);
  const history = useHistory();

  const gotoProfile = () => {
    setShowPopUp(false);
    history.push('/profile');
  };

  const logOut = () => {
    setShowPopUp(false);
    history.push('/login');
    userViewModel.logout();
  };

  const user = userViewModel.user;
  return (
    <PopUp
      show={showPopUp}
      onHide={() => setShowPopUp(false)}
      placement="bottom-left"
      overlay={
        <div className="pop-over-profile">
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
              <span className="button-content">Quản lý tài khoản của bạn</span>
            </div>
            <div className="center-horizontal action-button" onClick={logOut}>
              <AiOutlineLogout size={18} />
              <span style={{ marginLeft: 8 }} className=" button-content">
                Đăng xuất
              </span>
            </div>
          </div>
        </div>
      }
    >
      <Avatar onClick={() => setShowPopUp(!showPopUp)} user={user} size={35} />
    </PopUp>
  );
});
