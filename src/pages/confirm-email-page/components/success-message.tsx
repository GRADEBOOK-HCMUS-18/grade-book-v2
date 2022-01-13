import { BsCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './style/index.css';

export const SuccessMessage = () => {
  return (
    <div className="success text-center">
      <h3>
        <BsCheck size={16} />
        Xác nhận email thành công
      </h3>
      <Link to="/">
        <h4 className="come-back-dashboard-link">
          Click vào đây để quay trở về trang chủ
        </h4>
      </Link>
    </div>
  );
};
