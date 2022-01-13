import { BsCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './style/index.css';

export const SuccessMessage = () => {
  return (
    <div className="success text-center">
      <h3>
        <BsCheck size={16} /> Mật khẩu thay đổi thành công.
      </h3>
      <Link to="/login">
        <h4 className="come-back-login-link">
          Click vào đây để quay trở về trang đăng nhập.
        </h4>
      </Link>
    </div>
  );
};
