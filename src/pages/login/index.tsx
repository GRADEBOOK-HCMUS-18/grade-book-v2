import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import loginBanner from 'assets/images/logobanner.svg';
import { Loading } from 'shared/components';
import { googleLogin } from 'firebase-services/auth';
import { LoginViewModel } from './login-view-model';
import { LoginForm, RegisterForm } from './components';
import './style/index.css';

interface IProps {
  isLogin: boolean;
}

export const LoginPage = observer(({ isLogin }: IProps) => {
  const [viewModel] = useState(new LoginViewModel());

  const history = useHistory();

  const openRegisterForm = () => {
    history.push('/register');
  };

  const openLoginForm = () => {
    history.push('/');
  };

  const loginWithGoogle = async () => {
    viewModel.startLoading();
    const userInformation = await googleLogin();
    viewModel.stopLoading();
    console.log(userInformation);
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
        {isLogin ? <LoginForm /> : <RegisterForm />}

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
          <span>Đăng nhập bằng google</span>
        </div>
      </div>
      <div className="login-banner">
        <h2>Grade book</h2>
        <img src={loginBanner} alt="" className="banner-image"></img>
      </div>
    </div>
  );
});
