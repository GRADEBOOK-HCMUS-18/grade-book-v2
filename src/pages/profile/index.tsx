import { Observer } from 'mobx-react';
import { useState } from 'react';
import { PopupAlert, SnackBar } from 'shared/components';
import { User } from 'shared/models';
import { userViewModel, lineLoadingViewModel } from 'shared/view-models';
import { UserAvatar, UserInfo, PasswordChangeModal } from './components';
import './style/index.css';

const successMessage = 'Cập nhật thành công';

export const ProfilePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const changeAvatar = async (image: any) => {
    lineLoadingViewModel.startLoading();
    const result = await userViewModel.requestNewAvatar(image);
    if (result) {
      setIsSuccess(true);
    }
    lineLoadingViewModel.stopLoading();
  };

  const changeInfo = async (user: User) => {
    lineLoadingViewModel.startLoading();
    const result = await userViewModel.requestNewInfo(user);
    if (result) {
      setIsSuccess(true);
    }
    lineLoadingViewModel.stopLoading();
  };

  const changePassword = async (newPass: string, oldPass?: string) => {
    lineLoadingViewModel.startLoading();
    setShowModal(false);
    const result = await userViewModel.updatePassword(newPass, oldPass);
    if (result) {
      setIsSuccess(true);
    }
    lineLoadingViewModel.stopLoading();
  };

  return (
    <div className="container">
      <div className="center-vertical">
        <div className="profile-card">
          <div className="profile-header">
            <h4>Hồ sơ của bạn</h4>
          </div>
          <Observer>
            {() => {
              const user = userViewModel.user;
              return (
                <div className="user-profile">
                  <div className="user-form">
                    <UserInfo
                      openPasswordModal={() => setShowModal(true)}
                      onChange={changeInfo}
                      user={user}
                    />
                  </div>
                  <div className="user-avatar">
                    <p style={{ textAlign: 'center' }}>Ảnh đại diện</p>
                    <UserAvatar onUpdateAvatar={changeAvatar} user={user} />
                  </div>
                  <PasswordChangeModal
                    show={showModal}
                    isPasswordNotSet={user.isPasswordNotSet}
                    onChange={changePassword}
                    onHide={() => setShowModal(false)}
                  />
                  <PopupAlert
                    show={userViewModel.isError}
                    error={userViewModel.isError}
                    message={userViewModel.message}
                    onHide={() => {
                      userViewModel.deleteError();
                    }}
                  />
                  <SnackBar
                    show={isSuccess}
                    type="success"
                    message={successMessage}
                    onClose={() => setIsSuccess(false)}
                  />
                </div>
              );
            }}
          </Observer>
        </div>
      </div>
    </div>
  );
};
