import errorImg from 'assets/images/error.svg';
import './index.css';

export const ErrorContainer = () => {
  return (
    <div className="error-container">
      <div className="error-inside-container">
        <div className="error-message">
          <h2>Có lỗi xảy ra :(</h2>
          <h3>Hiện tại không thể kết nối</h3>
        </div>

        <img className="error-image" src={errorImg} alt=" "></img>
      </div>
    </div>
  );
};
