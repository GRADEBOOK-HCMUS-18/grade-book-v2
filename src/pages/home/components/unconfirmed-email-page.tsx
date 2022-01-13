import { Button } from 'react-bootstrap';
import { MdOutlineEmail } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

export const UnconfirmedEmailPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/confirm');
  };
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: '70vh' }}
    >
      <MdOutlineEmail size={200} style={{ color: 'blue' }} />
      <span
        className="me-3 mb-3"
        style={{ fontSize: '2rem', fontWeight: 'bold' }}
      >
        Bạn chưa xác thực email
      </span>
      <Button
        onClick={handleClick}
        color="lightBlue"
        style={{ fontSize: '1.5rem' }}
      >
        <strong>Xác thực ngay</strong>
      </Button>
    </div>
  );
};
