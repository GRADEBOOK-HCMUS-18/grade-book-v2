import { observer } from 'mobx-react';
import { userViewModel } from 'shared/view-models';
import { UserAvatar, UserInfo } from './components';
import './style/index.css';

export const ProfilePage = observer(() => {
  const user = userViewModel.getUser();

  const changeAvatar = (image: any) => {
    userViewModel.changeAvatar(image);
  };

  return (
    <div className="container">
      <div className="center-vertical">
        <div className="profile-card">
          <div className="profile-header">
            <h4>Hồ sơ của bạn</h4>
          </div>
          <div className="user-profile">
            <div className="user-form">
              <UserInfo user={user} />
            </div>
            <div className="user-avatar">
              <p>Ảnh đại diện</p>
              <UserAvatar onUpdateAvatar={changeAvatar} user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
