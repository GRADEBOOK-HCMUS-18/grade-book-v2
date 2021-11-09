import { observer } from 'mobx-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import { Button, Form } from 'react-bootstrap';
import './style/index.css';

export const LoginPage = observer(() => {
  return (
    <div className="login-container">
      <div className="login-banner">
        <h1>Chào mừng đến với Grade Book</h1>
        <GiOpenBook size={70} />
      </div>
      <div className="login-form">
        <h3 className="form-title">Đăng nhập vào Grade Book</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email/ Tên người dùng</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Lưu mật khẩu" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
        </Form>
        <div className="social-login">
          <div className="social-button">
            <FcGoogle size={30} />
            <span>Đăng nhập bằng google</span>
          </div>
          <div className="social-button">
            <FaFacebook size={30} />
            <span>Đăng nhập bằng Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
});
