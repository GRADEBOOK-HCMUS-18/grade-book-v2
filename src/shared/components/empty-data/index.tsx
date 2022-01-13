import Image from 'assets/images/nodata.svg';
import './index.css';
interface IProps {
  message: string;
  src?: string;
}

export const EmptyData = ({ message, src }: IProps) => {
  return (
    <div className="container">
      <div className="empty-container">
        {typeof src === 'undefined' ? (
          <img className="empty-image" src={Image} alt="empty-paper" />
        ) : (
          <img
            className="empty-image"
            src={require(`assets/images/${src}`).default}
            alt="empty-paper"
          />
        )}

        <p>{message}</p>
      </div>
    </div>
  );
};
