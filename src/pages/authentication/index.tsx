import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import loginBanner from 'assets/images/logobanner.svg';
import { usePreviousPath } from 'shared/hooks';
import { UserAuthen } from 'shared/types';
import { Loading, PopupAlert } from 'shared/components';
import { googleLogin } from 'firebase-services/auth';
import { LoginViewModel } from './authen-view-model';
import { LoginForm, RegisterForm } from './components';
import './style/index.css';

interface IProps {
  isLogin: boolean;
}

export const AuthenticationPage = observer(({ isLogin }: IProps) => {
  const [viewModel] = useState(new LoginViewModel());
  const { previousPath } = usePreviousPath();
  const history = useHistory();

  const openRegisterForm = () => {
    history.push('/register');
  };

  const openLoginForm = () => {
    history.push('/');
  };

  const onRegister = async (user: UserAuthen) => {
    const result = await viewModel.authenUser(user, 'register');
    if (result) {
      previousPath ? history.push(previousPath) : history.push('/');
    }
  };

  const onLogin = async (user: UserAuthen) => {
    console.log(previousPath);
    const result = await viewModel.authenUser(user, 'login');
    if (result) {
      previousPath ? history.push(previousPath) : history.push('/');
    }
  };

  const loginWithGoogle = async () => {
    const user: any = await googleLogin();
    if (!user) {
      return;
    }
    const result = await viewModel.authenUser(user, 'google');
    if (result) {
      previousPath ? history.push(previousPath) : history.push('/');
    }
  };

  return (
    <div className="login-container">
      <Loading isLoading={viewModel.loading} />

      <div className="login-form">
        {isLogin ? (
          <h3>Đăng nhập vào tài khoản của bạn</h3>
        ) : (
          <h3>Đăng kí tài khoản</h3>
        )}
        {isLogin ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <RegisterForm onRegister={onRegister} />
        )}

        {isLogin ? (
          <div className="register-area">
            <span>Chưa có tài khoản?</span>
            <span onClick={openRegisterForm} className="register-btn">
              {' '}
              Đăng kí
            </span>
          </div>
        ) : (
          <div className="register-area">
            <span>Đã có tài khoản?</span>
            <span onClick={openLoginForm} className="register-btn">
              {' '}
              Đăng nhập
            </span>
          </div>
        )}

        <div onClick={loginWithGoogle} className="social-button">
          <div className="google-icon">
            <FcGoogle size={30} />
          </div>
          {isLogin ? (
            <span>Đăng nhập bằng google</span>
          ) : (
            <span>Đăng ký bằng google</span>
          )}
        </div>
      </div>
      <div className="login-banner">
        <h2>Grade book</h2>
        <img src={loginBanner} alt="" className="banner-image"></img>
      </div>
      <PopupAlert
        show={viewModel.isError}
        error={true}
        onHide={() => viewModel.deleteError()}
        message={viewModel.message}
      />
    </div>
  );
});
