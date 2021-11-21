import errorImg from 'assets/images/error.svg';
import './index.css';

export const ErrorContainer = () => {
  return (
    <div className="error-container">
      <div className="error-inside-container">
        <h2 className="error-message">
          Có lỗi xảy ra :( <h3>Hiện tại không thể kết nối</h3>
        </h2>

        <img className="error-image" src={errorImg} alt=" "></img>
      </div>
    </div>
  );
};
