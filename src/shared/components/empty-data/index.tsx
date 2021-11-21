import Image from 'assets/images/nodata.svg';
import './index.css';
interface IProps {
  message: string;
}

export const EmptyData = ({ message }: IProps) => {
  return (
    <div className="container">
      <div className="empty-container">
        <img className="empty-image" src={Image} alt="empty-paper" />
        <p>{message}</p>
      </div>
    </div>
  );
};
