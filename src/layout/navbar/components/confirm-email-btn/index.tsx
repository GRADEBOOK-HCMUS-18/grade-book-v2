import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useResponsive } from 'shared/hooks';

export const ConfirmEmailBtn = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/confirm');
  };
  const { isMobile } = useResponsive();
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      {!isMobile && (
        <span
          className="me-3"
          style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          Bạn chưa xác thực email.
        </span>
      )}
      <Button
        onClick={handleClick}
        variant="primary"
        style={{ fontSize: '1rem' }}
      >
        <strong>Xác thực email</strong>
      </Button>
    </div>
  );
};
