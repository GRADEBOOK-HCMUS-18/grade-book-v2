import { BsCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './style/index.css';

export const SuccessMessage = () => {
  return (
    <div className="success">
      <h3>
        <BsCheck size={16} /> Mật khẩu của bạn đã được thay đổi.
      </h3>
      <h4 className="come-back-login-link">
        <Link to="/login">Click vào đây để quay trở về trang đăng nhập.</Link>
      </h4>
    </div>
  );
};
