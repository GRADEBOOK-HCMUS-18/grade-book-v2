import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useResponsive } from 'shared/hooks';
import { User } from 'shared/models';
import { userViewModel } from 'shared/view-models';

export const ConfirmEmailBtn = observer(() => {
  const history = useHistory();

  const { isMobile } = useResponsive();
  const user: User = userViewModel.user;
  const handleClick = () => {
    if (user.isEmailConfirmed === false) {
      const waitforResult = async () => {
        const result = await userViewModel.sendConfirmationCode();
        if (result) history.push('/confirm');
        else history.push('/');
      };
      waitforResult();
    }
  };
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
});
