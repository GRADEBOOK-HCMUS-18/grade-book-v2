import { Observer } from 'mobx-react';
import { useState } from 'react';
import { PopupAlert } from 'shared/components';
import { userViewModel } from 'shared/view-models';
import { UserAvatar, UserInfo } from './components';
import './style/index.css';

export const ProfilePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const user = userViewModel.user;

  const changeAvatar = async (image: any) => {
    const result = await userViewModel.requestNewAvatar(image);
    if (result) {
      userViewModel.message = 'Cập nhật thành công';
      setShowAlert(true);
    }
  };

  return (
    <div className="container">
      <div className="center-vertical">
        <div className="profile-card">
          <div className="profile-header">
            <h4>Hồ sơ của bạn</h4>
          </div>
          <Observer>
            {() => (
              <div className="user-profile">
                <div className="user-form">
                  <UserInfo user={user} />
                </div>
                <div className="user-avatar">
                  <p>Ảnh đại diện</p>
                  <UserAvatar onUpdateAvatar={changeAvatar} user={user} />
                </div>
              </div>
            )}
          </Observer>
        </div>
        <PopupAlert
          show={showAlert}
          error={userViewModel.isError}
          message={userViewModel.message}
          onHide={() => setShowAlert(false)}
        />
      </div>
    </div>
  );
};
