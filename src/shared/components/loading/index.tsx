import { Spinner } from 'react-bootstrap';
import './styles/index.css';

interface IProps {
  isLoading: boolean;
}

const animation = 'grow';
const size = 'sm';

export const Loading = ({ isLoading }: IProps) => {
  return (
    <>
      {isLoading ? (
        <div className="loading">
          <Spinner animation={animation} size={size} variant="primary" />
          <span className="space"></span>
          <Spinner animation={animation} size={size} variant="success" />
          <span className="space"></span>
          <Spinner animation={animation} size={size} variant="danger" />
          <span className="space"></span>
          <Spinner animation={animation} size={size} variant="warning" />
          <span className="space"></span>
          <Spinner animation={animation} size={size} variant="info" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
